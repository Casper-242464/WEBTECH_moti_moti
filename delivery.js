function validateForm() {
  const rules = [
    { id: 'street',  test: v => v.length >= 3,           msg: 'Enter a valid street (min 3 chars).' },
    { id: 'entrance',test: v => v.length > 0,            msg: 'Entrance is required.' },
    { id: 'intercom',test: v => v.length > 0,            msg: 'Intercom is required.' },
    { id: 'floor',   test: v => /^\d+$/.test(v),         msg: 'Floor must be a number.' },
    { id: 'apartment',test: v => /^\d+$/.test(v),       msg: 'Apartment must be a number.' },
  ];

  let allValid = true;
  rules.forEach(rule => {
    const el = document.getElementById(rule.id);
    if (!el) return;

    const value = (el.value || '').trim();
    const ok = rule.test(value);

    // find or create feedback element
    let feedback = el.parentNode.querySelector('.invalid-feedback');
    if (!feedback) {
      feedback = document.createElement('div');
      feedback.className = 'invalid-feedback';
      el.parentNode.appendChild(feedback);
    }

    if (!ok) {
      el.classList.add('is-invalid');
      el.classList.remove('is-valid');
      feedback.textContent = rule.msg;
      allValid = false;
    } else {
      el.classList.remove('is-invalid');
      el.classList.add('is-valid');
      feedback.textContent = '';
    }
  });

  return allValid;
}

// wire button
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('submit-delivery');
  if (!btn) return;

  btn.addEventListener('click', (e) => {
    // If you later wrap the inputs in a <form>, uncomment to prevent native submit:
    // e.preventDefault();

    if (validateForm()) {
      alert('Form is valid — ready to submit.');
    } else {
      const firstInvalid = document.querySelector('.is-invalid');
      if (firstInvalid) firstInvalid.focus();
    }
  });
});