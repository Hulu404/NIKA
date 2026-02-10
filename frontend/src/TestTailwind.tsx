// src/TestTailwind.tsx
export default function TestTailwind() {
  return (
    <div style={{ padding: '20px' }}>
      <h1 className="text-3xl font-bold text-blue-600">
        Тест Tailwind v4
      </h1>
      <div className="mt-4 p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg">
        <p>Если видите стили - Tailwind работает!</p>
        <button className="mt-2 px-4 py-2 bg-white text-purple-600 rounded">
          Кнопка с Tailwind
        </button>
      </div>
      
      <div className="mt-6">
        <p>Проверка:</p>
        <div className="flex gap-4 mt-2">
          <div className="w-10 h-10 bg-red-500 rounded"></div>
          <div className="w-10 h-10 bg-green-500 rounded"></div>
          <div className="w-10 h-10 bg-blue-500 rounded"></div>
        </div>
      </div>
    </div>
  );
}