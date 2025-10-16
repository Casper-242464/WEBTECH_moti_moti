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

// Main interactive features for Assignment 5
document.addEventListener('DOMContentLoaded', () => {
  // Theme toggle
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      document.body.classList.toggle('theme-dark');
      // store preference
      localStorage.setItem('theme-dark', document.body.classList.contains('theme-dark'));
      playClick();
    });
    // restore
    if (localStorage.getItem('theme-dark') === 'true') {
      document.body.classList.add('theme-dark');
    }
  }

  // Show current time button
  const showTime = document.getElementById('show-time');
  const timeOutput = document.getElementById('time-output');
  if (showTime && timeOutput) {
    showTime.addEventListener('click', () => {
      timeOutput.textContent = new Date().toLocaleTimeString();
      animateFlash(timeOutput);
      playClick();
    });
  }

  // Keyboard navigation for nav menu (left/right arrows)
  const nav = document.getElementById('main-nav');
  if (nav) {
    const links = Array.from(nav.querySelectorAll('a'));
    links.forEach((a, idx) => {
      a.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          const next = links[(idx + 1) % links.length];
          next.focus();
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          const prev = links[(idx - 1 + links.length) % links.length];
          prev.focus();
        }
      });
    });
  }

  // Render team on about.html
  const teamContainer = document.getElementById('team-container');
  if (teamContainer) {
    const team = [
      {
        name: 'Danial Khussainov',
        photo: 'img/danial.jpeg',
        desc: '18 y.o. Currently studying at Astana IT University. Striving to become a senior back-end developer and possibly become part of a game development team.'
      },
      {
        name: 'Zere',
        photo: 'img/zere.jpg',
        desc: 'Born in December 2006, from Almaty. Also a student at Astana IT University, dreaming of becoming a software engineer. Passionate about technology and new opportunities.'
      },
      {
        name: 'Mereke',
        photo: 'img/mereke.jpg',
        desc: 'Also studying at AITU; she joined for fun. Born in June 2007. Interested in programming and creative projects.'
      },
      {
        name: 'Bekasyl',
        photo: 'img/IMG_2361.jpg',
        desc: '18 years old, studies at AITU like Danial. Wants to become a backend developer. Currently works at Rixos President Astana hotel. Born 22 June 2007, from a small village in South Kazakhstan.'
      }
    ];

    // clear container then render
    teamContainer.innerHTML = '';
    team.forEach(member => {
      const card = document.createElement('article');
      card.className = 'team-card';
      card.innerHTML = `
        <img class="team-photo" src="${member.photo}" alt="${member.name}">
        <div class="team-content">
          <div class="team-name">${member.name}</div>
          <div class="team-desc">${member.desc}</div>
        </div>
      `;
      // lazy image error fallback
      const img = card.querySelector('img');
      img.addEventListener('error', () => {
        img.src = 'img/placeholder.png';
      });
      teamContainer.appendChild(card);
    });
  }

  // small helper sounds using WebAudio API
  function playClick() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.value = 600;
      g.gain.value = 0.03;
      o.connect(g);
      g.connect(ctx.destination);
      o.start();
      setTimeout(() => { o.stop(); ctx.close(); }, 80);
    } catch (e) { /* ignore on unsupported */ }
  }

  // simple animation helper
  function animateFlash(el) {
    el.style.transition = 'transform .18s ease';
    el.style.transform = 'scale(1.04)';
    setTimeout(() => el.style.transform = '', 220);
  }
});
