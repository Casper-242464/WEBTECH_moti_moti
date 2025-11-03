from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import telebot

app = Flask(__name__)
CORS(app)  # Разрешаем CORS для любых источников

# --- Настройки Telegram ---
BOT_TOKEN = "8217178286:AAGWP-1TDmM1sm3bD9lPnJ9VU5qMzPdyEM8"
CHAT_ID = "1686962725"
bot = telebot.TeleBot(BOT_TOKEN)

# Главная страница — index.html (лежит рядом с app.py)
@app.route('/')
def index():
    return send_file('index.html')

# Обработка заказа
@app.route('/submit_order', methods=['POST'])
def submit_order():
    data = request.json

    street = data.get('street')
    entrance = data.get('entrance')
    intercom = data.get('intercom')
    floor = data.get('floor')
    apartment = data.get('apartment')
    comment = data.get('comment')
    cart = data.get('cart', [])

    # Формируем сообщение для Telegram
    message = f"🧁 Новый заказ!\n\n" \
              f"📍 Адрес: {street}\n" \
              f"🚪 Подъезд: {entrance}\n" \
              f"🔢 Этаж: {floor}\n" \
              f"🏠 Кв: {apartment}\n" \
              f"🔔 Домофон: {intercom}\n" \
              f"💬 Комментарий: {comment}\n\n"

    if cart:
        message += "🛒 Корзина:\n"
        for item in cart:
            name = item.get('title')
            price = item.get('price')
            message += f"— {name} = {price}₸\n"

    # Отправка в Telegram
    try:
        bot.send_message(CHAT_ID, message)
    except Exception as e:
        print("Ошибка Telegram:", e)
        return jsonify({"status": "error", "message": "Ошибка отправки в Telegram"}), 500

    return jsonify({"status": "success", "message": "Заказ отправлен!"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
