const API_BASE_URL = ''; // если прокси, то оставляем пустым

let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

// Подписка на обновление токена – все запросы, пришедшие во время обновления, ждут
function subscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

// После успешного обновления уведомляем всех подписчиков
function onRefreshed(token: string) {
  refreshSubscribers.forEach(cb => cb(token));
  refreshSubscribers = [];
}

// Основная функция для запросов с авторизацией
export async function fetchWithAuth(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  // Функция, которая выполняет запрос с текущим токеном
  const makeRequest = (token: string | null) => {
    const headers = new Headers(options.headers || {});
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers,
    });
  };
    console.log('Fetching URL:', url);
  // Первый запрос
  let token = localStorage.getItem('access_token');
  let response = await makeRequest(token);

  // Если ответ не 401/422 – возвращаем как есть
  if (response.status !== 401 && response.status !== 422) {
    return response;
  }

  // Если уже идёт обновление токена – подписываемся и ждём
  if (isRefreshing) {
    return new Promise<Response>((resolve) => {
      subscribeTokenRefresh(async (newToken) => {
        // Повторяем запрос с новым токеном
        const retryResponse = await makeRequest(newToken);
        resolve(retryResponse);
      });
    });
  }

  // Начинаем процесс обновления
  isRefreshing = true;

  try {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      throw new Error('No refresh token');
    }

    const refreshResponse = await fetch(`${API_BASE_URL}/api/v1/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    if (!refreshResponse.ok) {
      // Если обновление не удалось (например, refresh истёк) – чистим токены и редирект на логин
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('chat_session_id');
      window.location.href = '/login';
      throw new Error('Refresh failed');
    }

    const data = await refreshResponse.json();
    const newAccessToken = data.access_token; // предполагаем, что сервер возвращает поле access_token
    localStorage.setItem('access_token', newAccessToken);

    // Уведомляем всех ожидающих подписчиков
    onRefreshed(newAccessToken);

    // Повторяем исходный запрос
    const retryResponse = await makeRequest(newAccessToken);
    return retryResponse;

  } catch (error) {
    // В случае ошибки редиректим на логин
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('chat_session_id');
    window.location.href = '/login';
    throw error;
  } finally {
    isRefreshing = false;
  }
}