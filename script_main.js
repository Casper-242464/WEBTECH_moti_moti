// script.js
// Реализует: плавный аккордеон (клик/клавиатура) и анимацию появления при скролле

document.addEventListener('DOMContentLoaded', () => {
  // ---------- Accordion: клик и клавиатура ----------
  const questions = Array.from(document.querySelectorAll('.accordion-question'));

  questions.forEach(q => {
    // Открытие/закрытие по клику
    q.addEventListener('click', () => toggleAnswer(q));

    // Открытие/закрытие по Enter или Space (доступность)
    q.addEventListener('keydown', (evt) => {
      if (evt.key === 'Enter' || evt.key === ' ') {
        evt.preventDefault();
        toggleAnswer(q);
      }
    });
  });

  function toggleAnswer(questionEl) {
    const answerEl = questionEl.nextElementSibling;
    if (!answerEl) return;

    const isOpen = answerEl.classList.contains('open');

    // Закрыть все остальные ответы
    document.querySelectorAll('.accordion-answer.open').forEach(a => {
      if (a !== answerEl) closeAnswer(a);
    });

    // Переключить текущий
    if (isOpen) {
      closeAnswer(answerEl);
      questionEl.setAttribute('aria-expanded', 'false');
      answerEl.setAttribute('aria-hidden', 'true');
    } else {
      openAnswer(answerEl);
      questionEl.setAttribute('aria-expanded', 'true');
      answerEl.setAttribute('aria-hidden', 'false');
    }
  }

  function openAnswer(a) {
    a.classList.add('open');
    // задаём точную высоту для плавного раскрытия
    const height = a.scrollHeight;
    a.style.maxHeight = height + 'px';
  }

  function closeAnswer(a) {
    // чтобы анимация сработала, сначала сбрасываем высоту, затем удаляем класс
    a.style.maxHeight = a.scrollHeight + 'px'; // ставим текущее значение, чтобы transition сработал
    // forced reflow для гарантии (чтобы браузер применил стиль)
    // eslint-disable-next-line no-unused-expressions
    a.offsetHeight;
    a.style.maxHeight = '0px';
    a.classList.remove('open');
  }

  // ---------- IntersectionObserver: появление при скролле ----------
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target); // один раз — больше не наблюдаем
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});


// ABOUT //
// ===== Анимация появления карточек =====
window.addEventListener("load", () => {
  const cards = document.querySelectorAll(".team-card");
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("show");
    }, index * 150);
  });
});

// ===== Плавное перетаскивание (работает и на телефоне) =====
const cards = document.querySelectorAll(".draggable");

cards.forEach(card => {
  let active = false;
  let currentX, currentY, initialX, initialY;
  let xOffset = 0, yOffset = 0;

  const setTranslate = (xPos, yPos) => {
    card.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
  };

  const dragStart = (x, y) => {
    initialX = x - xOffset;
    initialY = y - yOffset;
    active = true;
    card.style.transition = "none";
  };

  const dragEnd = () => {
    active = false;
    card.style.transition = "transform 0.3s ease";
    // плавно возвращаем на место
    xOffset = 0;
    yOffset = 0;
    setTranslate(0, 0);
  };

  const drag = (x, y) => {
    if (!active) return;
    xOffset = x - initialX;
    yOffset = y - initialY;
    setTranslate(xOffset, yOffset);
  };

  // мышь
  card.addEventListener("mousedown", (e) => dragStart(e.clientX, e.clientY));
  document.addEventListener("mouseup", dragEnd);
  document.addEventListener("mousemove", (e) => drag(e.clientX, e.clientY));

  // сенсор (телефоны)
  card.addEventListener("touchstart", (e) => {
    const touch = e.touches[0];
    dragStart(touch.clientX, touch.clientY);
  });
  card.addEventListener("touchend", dragEnd);
  card.addEventListener("touchmove", (e) => {
    const touch = e.touches[0];
    drag(touch.clientX, touch.clientY);
  });
});
