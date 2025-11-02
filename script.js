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
// const themeBtn = document.createElement('button');
// themeBtn.textContent = '🌙 Toggle Theme';
// themeBtn.className = 'btn';
// themeBtn.style.position = 'fixed';
// themeBtn.style.bottom = '100px';
// themeBtn.style.right = '20px';
// themeBtn.style.zIndex = '999';
// document.body.appendChild(themeBtn);

// themeBtn.addEventListener('click', () => {
//   document.body.classList.toggle('dark-mode');
// });

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

// === Unified Search: Real-time Filter + Autocomplete ===
const searchBar = document.getElementById('searchBar');
const suggestionsBox = document.getElementById('suggestions');

if (searchBar && suggestionsBox) {
  // Get all product names from the page
  const products = Array.from(document.querySelectorAll('.product-title')).map(el => el.textContent);

  searchBar.addEventListener('input', () => {
    const term = searchBar.value.toLowerCase().trim();
    suggestionsBox.innerHTML = '';

    // Filter visible cards (real-time filtering)
    document.querySelectorAll('.product-card').forEach(card => {
      const title = card.querySelector('.product-title').textContent.toLowerCase();
      card.style.display = title.includes(term) ? 'flex' : 'none';
    });

    // Autocomplete suggestions
    if (term.length === 0) {
      suggestionsBox.style.display = 'none';
      document.querySelectorAll('.product-card').forEach(card => card.style.display = 'flex');
      return;
    }

    const matches = products.filter(p => p.toLowerCase().includes(term));
    if (matches.length > 0) {
      matches.forEach(match => {
        const li = document.createElement('li');
        li.textContent = match;
        li.style.padding = '10px';
        li.style.cursor = 'pointer';
        li.addEventListener('click', () => {
          searchBar.value = match;
          suggestionsBox.style.display = 'none';

          // Filter to exact match
          document.querySelectorAll('.product-card').forEach(card => {
            const title = card.querySelector('.product-title').textContent.toLowerCase();
            card.style.display = title === match.toLowerCase() ? 'flex' : 'none';
          });
        });
        li.addEventListener('mouseenter', () => li.style.background = '#ffe4e1');
        li.addEventListener('mouseleave', () => li.style.background = 'transparent');
        suggestionsBox.appendChild(li);
      });
      suggestionsBox.style.display = 'block';
    } else {
      suggestionsBox.style.display = 'none';
    }
  });

  // Hide suggestions when clicking outside
  document.addEventListener('click', e => {
    if (!suggestionsBox.contains(e.target) && e.target !== searchBar) {
      suggestionsBox.style.display = 'none';
    }
  });
}
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.2 });

  cards.forEach(card => observer.observe(card));
});
