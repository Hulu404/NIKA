from langchain_core.messages import HumanMessage, AIMessage
from giga_agents import app

# ИНТЕРАКТИВНЫЙ ЧАТ С ИНТЕЛЛЕКТУАЛЬНЫМ РОУТЕРОМ

print("\n" + "=" * 60)
print("🤖 Ника - Умная помощница для спортсменов-любителей")
print("=" * 60)
print("Теперь я понимаю контекст и выбираю подходящего помощника!")
print("\nПопробуй спросить:")
print("  - 'Как тебя зовут?' (общий вопрос)")
print("  - 'Я устал от тренировок' (поддержка)")
print("  - 'Как улучшить технику?' (совет)")
print("  - 'Расскажи шутку' (юмор)")
print("  - 'Дай мне пинка!' (строгий коуч)")
print("\nНапиши 'выход' чтобы завершить")
print("-" * 60)

thread_id = input("Введи свое имя для чата: ").strip() or "спортсмен"
config = {"configurable": {"thread_id": thread_id}}

# Начальное состояние
state = {"messages": [], "last_agent": "", "user_name": "друг"}

while True:
    user_input = input(f"\n🏃 {state.get('user_name', 'друг')}: ").strip()

    if user_input.lower() in ['выход', 'exit', 'quit', 'стоп', 'stop']:
        print(f"\n🤖 Ника: Пока, {state.get('user_name', 'друг')}! Возвращайся за поддержкой! 💪")
        break

    if not user_input:
        print("🤖 Ника: Напиши что-нибудь, я готов помочь!")
        continue

    try:
        # Обновляем сообщения
        state["messages"].append(HumanMessage(content=user_input))

        # Вызываем граф
        result = app.invoke(state, config=config)

        # Обновляем состояние
        state["messages"].extend(result.get("messages", []))
        state["last_agent"] = result.get("last_agent", "")
        state["user_name"] = result.get("user_name", state.get("user_name", "друг"))

        # Выводим ответ
        agent_type = result.get("last_agent", "")
        agent_emojis = {
            "support": "🤗",
            "advice": "💡",
            "motivation": "🔥",
            "humor": "😂",
            "coach": "👊",
            "general": "🤖"
        }

        emoji = agent_emojis.get(agent_type, "🤖")

        if result.get("messages"):
            for msg in result["messages"]:
                if isinstance(msg, AIMessage):
                    print(f"\n{emoji} Ника ({agent_type}): {msg.content}")

    except Exception as e:
        print(f"\n❌ Ошибка: {e}")
        import traceback
        traceback.print_exc()
        print("Попробуй еще раз")


# ЗАПУСК
if __name__ == "__main__":
    # Запускаем интерактивный чат
    print("\n" + "=" * 60)
    input("Нажми Enter чтобы начать интерактивный чат...")