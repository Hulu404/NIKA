from typing import TypedDict
from langchain_gigachat.chat_models import GigaChat
import giga_config
from langgraph.checkpoint.memory import MemorySaver
from langgraph.graph import StateGraph
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.output_parsers import StrOutputParser


# Определение состояния
class AgentState(TypedDict):
    messages: list
    last_agent: str
    user_name: str  # Для хранения имени пользователя


# Инициализация модели
model = GigaChat(
    credentials=giga_config.CREDENTIALS,
    scope=giga_config.GIGACHAT_SCOPE,
    model="GigaChat-2",
    verify_ssl_certs=giga_config.GIGACHAT_VERIFY_SSL_CERTS,
)


# 1. РОУТЕР НА ОСНОВЕ МОДЕЛИ
def create_model_router():
    """Создает интеллектуальный роутер на основе модели"""

    router_prompt = ChatPromptTemplate.from_messages([
        SystemMessage(content="""Ты - классификатор запросов для спортивного помощника.

        Анализируй сообщение пользователя и определяй, к какому типу помощи оно относится.

        ВОЗМОЖНЫЕ КАТЕГОРИИ:
        1. support_agent - эмоциональная поддержка, жалобы на усталость, разочарование, сложности
        2. advice_agent - запрос конкретных советов, рекомендаций, "как сделать"
        3. motivation_agent - нехватка мотивации, лень, желание бросить
        4. humor_agent - запросы на юмор, шутки, развлечение
        5. coach_agent - запрос строгого подхода, дисциплины, "пинка"
        6. general_agent - общие вопросы, знакомство, вопросы о помощнике, не связанные со спортом

        ВОЗВРАЩАЙ ТОЛЬКО НАЗВАНИЕ КАТЕГОРИИ (одно слово) и ничего больше.
        """),
        MessagesPlaceholder(variable_name="messages"),
        HumanMessage(content="К какому типу относится последнее сообщение?")
    ])

    return router_prompt | model | StrOutputParser()


# Инициализируем интеллектуальный роутер
model_router = create_model_router()


def routing_node(state: AgentState) -> dict:
    """Умный роутер на основе модели"""

    # Если сообщений нет, используем агента по умолчанию
    if not state["messages"]:
        return {"last_agent": "general_agent"}

    # Получаем последнее сообщение пользователя
    last_user_message = None
    for msg in reversed(state["messages"]):
        if isinstance(msg, HumanMessage):
            last_user_message = msg
            break

    if not last_user_message:
        return {"last_agent": "general_agent"}

    try:
        # Используем модель для классификации
        router_response = model_router.invoke({"messages": [last_user_message]})

        # Очищаем ответ (иногда модель может добавлять пояснения)
        router_response = router_response.strip().lower()

        # Извлекаем только название агента из ответа
        valid_agents = ["support_agent", "advice_agent", "motivation_agent",
                        "humor_agent", "coach_agent", "general_agent"]

        for agent in valid_agents:
            if agent in router_response:
                return {"last_agent": agent}

        # Проверяем по ключевым словам на всякий случай
        message_content = last_user_message.content.lower()

        # Проверка на общие вопросы (имя, возраст, возможности)
        general_keywords = ["зовут", "имя", "тебя", "твой", "возраст", "сколько лет",
                            "умеешь", "можешь", "способен", "делать", "твои", "функции",
                            "привет", "здравствуй", "добрый", "пока", "спасибо", "благодарю",
                            "что ты", "кто ты", "ты кто", "расскажи о себе"]

        if any(keyword in message_content for keyword in general_keywords):
            return {"last_agent": "general_agent"}

        # По умолчанию - friendly advice
        return {"last_agent": "advice_agent"}

    except Exception as e:
        print(f"Ошибка в роутере: {e}")
        return {"last_agent": "general_agent"}


# 2. ОБНОВЛЕННЫЕ ПРОМПТЫ ДЛЯ АГЕНТОВ
AGENT_PROMPTS = {
    "support_agent": """Ты - заботливый спортивный помощник для любителей спорта. 
    Твоя задача - поддержать спортсмена эмоционально, проявить эмпатию и понимание.
    Используй теплый, мягкий тон. Поддержи, но не давай советов, если не просят.
    Примеры: "Я понимаю, как тебе тяжело", "Ты справляешься лучше, чем думаешь",
    "Давай просто отдохнем и продолжим завтра". Не давай советов, если не просят.

    Имя пользователя: {user_name}""",

    "advice_agent": """Ты - опытный спортивный товарищ для любителей спорта. 
    Дай практичный, дружеский совет. Будь конкретным, но не навязчивым.
    Используй формулировки: "Попробуй...", "Я бы на твоем месте...",
    "Один хороший способ это...". Делись практическими рекомендациями.

    Имя пользователя: {user_name}""",

    "motivation_agent": """Ты - мотивационный спикер для спортсменов-любителей.
    Вдохновляй, но не дави. Используй позитивные утверждения.
    Примеры: "Каждый шаг имеет значение!", "Ты ближе к цели, чем вчера",
    "Помни, ради чего начал", "Маленький прогресс - все равно прогресс!".

    Имя пользователя: {user_name}""",

    "humor_agent": """Ты - веселый спортивный приятель для любителей спорта.
    Шути на спортивные темы, но уважительно. Поднимай настроение.
    Можешь использовать легкую самоиронию, смешные сравнения.
    Пример: "Мышцы после тренировки как кот, который требует внимания - 
    и больно, и приятно одновременно!".

    Имя пользователя: {user_name}""",

    "coach_agent": """Ты - строгий спортивный тренер, но с дружеским подходом для любителей спорта.
    Будь прямолинейным, но поддерживающим. Ставь задачи, напоминай о цели.
    Используй: "Соберись!", "Ты можешь больше", "Не сдавайся сейчас",
    "Дисциплина - твой лучший друг". Добавляй конкретные рекомендации.

    Имя пользователя: {user_name}""",

    "general_agent": """Ты - дружелюбный помощник. Отвечай на общие вопросы о себе и помогай пользователю.

    О СЕБЕ:
    - Меня зовут Ника
    - Я спортивный помощник для любителей спорта
    - Я умею: поддерживать, давать советы, мотивировать, шутить и быть строгим тренером
    - Мой создатель: Криштиану Руналду
    - Моя цель: помогать любителям спорта оставаться мотивированными и получать удовольствие от тренировок

    ПРАВИЛА:
    1. На вопросы о себе отвечай прямо и дружелюбно
    2. На вопросы о погоде, времени и т.д. отвечай кратко
    3. Если пользователь представляется - запомни его имя и используй в разговоре
    4. Не давай спортивных советов, если пользователь спрашивает о чем-то другом
    5. Будь вежливым и полезным

    Текущее имя пользователя: {user_name}

    Примеры:
    - "Как тебя зовут?" → "Меня зовут Спортик! Я твой спортивный помощник."
    - "Что ты умеешь?" → "Я умею поддерживать тебя, давать советы по тренировкам, мотивировать и даже шутить!"
    - "Привет!" → "Привет{user_name_formatted}! Рад тебя видеть! Как твои тренировки?"
    """
}


# 3. ФУНКЦИЯ ДЛЯ ИЗВЛЕЧЕНИЯ ИМЕНИ ПОЛЬЗОВАТЕЛЯ
def extract_user_name(state: AgentState) -> str:
    """Извлекает имя пользователя из истории сообщений"""
    default_name = "друг"

    if not state.get("messages"):
        return default_name

    # Ищем в сообщениях представление
    for msg in state["messages"]:
        if isinstance(msg, HumanMessage):
            content = msg.content.lower()
            # Проверяем распространенные фразы представления
            if "зовут" in content and ("меня" in content or "мое имя" in content):
                # Пытаемся извлечь имя
                words = msg.content.split()
                for i, word in enumerate(words):
                    if word.lower() in ["зовут", "имя", "меня"] and i + 1 < len(words):
                        potential_name = words[i + 1]
                        # Очищаем имя от знаков препинания
                        potential_name = ''.join(c for c in potential_name if c.isalpha())
                        if potential_name and len(potential_name) > 1:
                            return potential_name

    return state.get("user_name", default_name)


# 4. СПЕЦИАЛИЗИРОВАННЫЕ АГЕНТЫ
def create_agent_chain(agent_name: str):
    """Создает цепочку для агента с учетом имени пользователя"""

    def agent_chain(state: AgentState):
        # Извлекаем имя пользователя
        user_name = extract_user_name(state)

        # Форматируем промпт с именем пользователя
        system_prompt = AGENT_PROMPTS[agent_name].format(
            user_name=user_name,
            user_name_formatted=f", {user_name}" if user_name != "друг" else ""
        )

        prompt = ChatPromptTemplate.from_messages([
            SystemMessage(content=system_prompt),
            MessagesPlaceholder(variable_name="messages")
        ])

        chain = prompt | model
        response = chain.invoke({"messages": state["messages"]})

        # Обновляем имя пользователя в состоянии, если узнали его
        updated_user_name = user_name
        for msg in state["messages"]:
            if isinstance(msg, HumanMessage):
                content = msg.content.lower()
                if "зовут" in content and ("меня" in content or "мое имя" in content):
                    words = msg.content.split()
                    for i, word in enumerate(words):
                        if word.lower() in ["зовут", "имя", "меня"] and i + 1 < len(words):
                            potential_name = words[i + 1]
                            potential_name = ''.join(c for c in potential_name if c.isalpha())
                            if potential_name and len(potential_name) > 1:
                                updated_user_name = potential_name

        return {
            "messages": [response],
            "last_agent": agent_name.replace("_agent", ""),
            "user_name": updated_user_name
        }

    return agent_chain


# СОЗДАНИЕ ГРАФА
workflow = StateGraph(state_schema=AgentState)

# Добавляем узлы
workflow.add_node("router", routing_node)
workflow.add_node("support_agent", create_agent_chain("support_agent"))
workflow.add_node("advice_agent", create_agent_chain("advice_agent"))
workflow.add_node("motivation_agent", create_agent_chain("motivation_agent"))
workflow.add_node("humor_agent", create_agent_chain("humor_agent"))
workflow.add_node("coach_agent", create_agent_chain("coach_agent"))
workflow.add_node("general_agent", create_agent_chain("general_agent"))

# Настраиваем граф
workflow.set_entry_point("router")


# Условные переходы от роутера
def decide_next_node(state: AgentState):
    return state.get("last_agent", "general_agent")


workflow.add_conditional_edges(
    "router",
    decide_next_node,
    {
        "support_agent": "support_agent",
        "advice_agent": "advice_agent",
        "motivation_agent": "motivation_agent",
        "humor_agent": "humor_agent",
        "coach_agent": "coach_agent",
        "general_agent": "general_agent"
    }
)

# Все агенты завершают выполнение
for agent_name in ["support_agent", "advice_agent", "motivation_agent",
                   "humor_agent", "coach_agent", "general_agent"]:
    workflow.add_edge(agent_name, "__end__")

# КОМПИЛЯЦИЯ
memory = MemorySaver()
app = workflow.compile(checkpointer=memory)


