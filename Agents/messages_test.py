from langchain_core.messages import HumanMessage, AIMessage
from giga_agents import app

def main():
    # ТЕСТИРОВАНИЕ ИНТЕЛЛЕКТУАЛЬНОГО РОУТЕРА
    """Тестирование интеллектуального роутера"""

    test_cases = [
        ("Я устал от тренировок, не вижу прогресса...", "support_agent"),
        ("Как правильно делать растяжку после бега?", "advice_agent"),
        ("Сегодня совсем нет мотивации идти в зал", "motivation_agent"),
        ("Расскажи смешную историю про спорт", "humor_agent"),
        ("Мне нужен пинок, чтобы пойти на тренировку", "coach_agent"),
        ("Как тебя зовут?", "general_agent"),
        ("Привет! Меня зовут Алекс", "general_agent"),
        ("Что ты умеешь?", "general_agent"),
        ("Какая сегодня погода?", "general_agent"),
        ("Болят мышцы после вчерашней тренировки", "support_agent"),
        ("Как улучшить выносливость?", "advice_agent"),
    ]

    print("🧠 Тестирование интеллектуального роутера")
    print("=" * 60)

    config = {"configurable": {"thread_id": "test_router"}}

    for i, (message, expected_agent) in enumerate(test_cases, 1):
        print(f"\nТест {i}:")
        print(f"Вход: '{message}'")

        result = app.invoke(
            {"messages": [HumanMessage(content=message)]},
            config=config
        )

        actual_agent = result.get("last_agent", "unknown")
        status = "✅" if actual_agent in expected_agent else "❌"

        print(f"Ожидалось: {expected_agent}")
        print(f"Получено: {actual_agent} {status}")

        if result.get("messages"):
            for msg in result["messages"]:
                if isinstance(msg, AIMessage):
                    print(f"Ответ: {msg.content[:80]}..." if len(msg.content) > 80 else f"Ответ: {msg.content}")

        print("-" * 40)

if __name__ == "__main__":
    main()
