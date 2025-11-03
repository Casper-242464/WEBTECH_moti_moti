from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import telebot
import os

app = Flask(__name__)
CORS(app)

# --- Настройки Telegram ---
BOT_TOKEN = "8217178286:AAGWP-1TDmM1sm3bD9lPnJ9VU5qMzPdyEM8"
CHAT_ID = "1686962725"
bot = telebot.TeleBot(BOT_TOKEN)

# Текущая папка с файлами
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# --- HTML страницы ---
@app.route('/')
@app.route('/index.html')
def index():
    return send_file(os.path.join(BASE_DIR, 'index.html'))

@app.route('/products.html')
def products():
    return send_file(os.path.join(BASE_DIR, 'products.html'))

@app.route('/gallery.html')
def gallery():
    return send_file(os.path.join(BASE_DIR, 'gallery.html'))

@app.route('/delivery.html')
def delivery():
    return send_file(os.path.join(BASE_DIR, 'delivery.html'))

@app.route('/contact.html')
def contact():
    return send_file(os.path.join(BASE_DIR, 'contact.html'))

@app.route('/locations.html')
def locations():
    return send_file(os.path.join(BASE_DIR, 'locations.html'))

@app.route('/about.html')
def about():
    return send_file(os.path.join(BASE_DIR, 'about.html'))

# --- Статика (JS, CSS, изображения) ---
@app.route('/<path:filename>')
def static_files(filename):
    return send_file(os.path.join(BASE_DIR, filename))

# --- Обработка заказа ---
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
            message += f"— {item.get('title')} = {item.get('price')}₸\n"

    try:
        bot.send_message(CHAT_ID, message)
    except Exception as e:
        print("Ошибка Telegram:", e)
        return jsonify({"status": "error", "message": "Ошибка отправки в Telegram"}), 500

    return jsonify({"status": "success", "message": "Заказ отправлен!"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
