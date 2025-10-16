// --- Task 1: Form Validation ---
document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.form-card');
  if (form) {
    form.addEventListener('submit', function (event) {
      const name = document.getElementById('name');
      const phone = document.getElementById('phone');
      const email = document.getElementById('email');
      const message = document.getElementById('message');

      // Simple validation
      if (!name.value.trim() || !phone.value.trim()) {
        alert('Please fill in all required fields (Name and Phone).');
        event.preventDefault();
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email.value && !emailPattern.test(email.value)) {
        alert('Please enter a valid email address.');
        event.preventDefault();
        return;
      }

      if (message.value.trim().length < 5) {
        alert('Please write a longer message or order details.');
        event.preventDefault();
      }
    });
  }
});

// --- Task 2: Accordion for FAQs ---
const questions = document.querySelectorAll('.accordion-item h3');
questions.forEach(q => {
  q.addEventListener('click', () => {
    q.classList.toggle('active');
    const content = q.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
});

// --- Task 3: Popup Form ---
const popupBtn = document.getElementById('popupBtn');
const popup = document.getElementById('popupForm');
const closePopup = document.getElementById('closePopup');

if (popupBtn && popup && closePopup) {
  popupBtn.addEventListener('click', () => popup.style.display = 'flex');
  closePopup.addEventListener('click', () => popup.style.display = 'none');
  window.addEventListener('click', (e) => {
    if (e.target === popup) popup.style.display = 'none';
  });
}

// --- Task 4: Change Background Color ---
const colorBtn = document.getElementById('colorBtn');
if (colorBtn) {
  colorBtn.addEventListener('click', () => {
    const colors = ['#ffe4e1', '#fff8f5', '#f0e68c', '#e6e6fa', '#b0e0e6', '#f5deb3'];
    document.body.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
  });
}

// --- Task 5: Display Current Date and Time ---
const dateTimeBlock = document.getElementById('dateTime');
if (dateTimeBlock) {
  function updateDateTime() {
    const now = new Date();
    const formatted = now.toLocaleString('en-US', {
      month: 'long', day: 'numeric', year: 'numeric',
      hour: 'numeric', minute: '2-digit', second: '2-digit',
    });
    dateTimeBlock.textContent = formatted;
  }
  updateDateTime();
  setInterval(updateDateTime, 1000);
}
