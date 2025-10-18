// === Проверка подключения ===
console.log("✅ script.js загружен");

// === Обновляем год ===
if (document.getElementById('year')) {
  document.getElementById('year').textContent = new Date().getFullYear();
}
if (document.getElementById('year2')) {
  document.getElementById('year2').textContent = new Date().getFullYear();
}

// === 1. Кнопки "В корзину" ===
document.querySelectorAll('.add-to-cart').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    btn.style.backgroundColor = '#2e7d32';
    btn.style.transform = 'scale(1.1)';
    setTimeout(() => (btn.style.transform = 'scale(1)'), 200);

    alert('✅ Товар добавлен в корзину!');
  });
});

// === 2. Переключатель темы ===
const themeBtn = document.createElement('button');
themeBtn.textContent = '🌙 Toggle Theme';
themeBtn.className = 'btn';
themeBtn.style.position = 'fixed';
themeBtn.style.bottom = '100px';
themeBtn.style.right = '20px';
themeBtn.style.zIndex = '999';
document.body.appendChild(themeBtn);

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// === 3. Показ времени ===
const timeBtn = document.createElement('button');
timeBtn.textContent = '🕒 Show Time';
timeBtn.className = 'btn';
timeBtn.style.position = 'fixed';
timeBtn.style.bottom = '50px';
timeBtn.style.right = '20px';
timeBtn.style.zIndex = '999';
document.body.appendChild(timeBtn);

const timeDisplay = document.createElement('div');
timeDisplay.style.position = 'fixed';
timeDisplay.style.bottom = '20px';
timeDisplay.style.right = '25px';
timeDisplay.style.fontWeight = 'bold';
timeDisplay.style.color = '#ff69b4';
document.body.appendChild(timeDisplay);

timeBtn.addEventListener('click', () => {
  const now = new Date().toLocaleTimeString();
  timeDisplay.textContent = now;
});

// === 4. "Read More" ===
const aboutParagraph = document.querySelector('.card p');
if (aboutParagraph) {
  const extraText = document.createElement('p');
  extraText.textContent = "🎂 We also prepare personalized cakes, cupcakes, and seasonal sweets!";
  extraText.style.display = 'none';
  aboutParagraph.after(extraText);

  const readBtn = document.createElement('button');
  readBtn.textContent = 'Read More';
  readBtn.className = 'btn';
  readBtn.style.marginTop = '10px';
  aboutParagraph.after(readBtn);

  readBtn.addEventListener('click', () => {
    const isHidden = extraText.style.display === 'none';
    extraText.style.display = isHidden ? 'block' : 'none';
    readBtn.textContent = isHidden ? 'Read Less' : 'Read More';
  });
}

// === 5. Форма (Contacts) ===
const contactForm = document.querySelector('.form-card');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    alert(`💌 Thank you, ${name}! Your message was sent successfully.`);
    contactForm.reset();
  });
}

// === 6. События клавиатуры ===
document.addEventListener('keydown', e => {
  switch (e.key) {
    case 'ArrowUp':
      document.body.style.backgroundColor = '#fff8f5';
      document.body.style.color = '#333';
      break;
    case 'ArrowDown':
      document.body.style.backgroundColor = '#333';
      document.body.style.color = '#fff';
      break;
    case 'r':
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
      break;
  }
});
