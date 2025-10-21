// show a temporary toast that fades out
function showToast(message, duration = 3000) {
  // remove existing toast(s) if present
  document.querySelectorAll('.temp-toast').forEach(t => t.remove());

  const toast = document.createElement('div');
  toast.className = 'temp-toast';
  toast.textContent = message;
  document.body.appendChild(toast);

  // trigger CSS transition
  requestAnimationFrame(() => toast.classList.add('show'));

  // hide and remove after duration
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400); // match CSS transition time
  }, duration);
}

// ...existing code...
    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = btn.dataset.originalHtml;
      btn.classList.remove('loading');

      // success action (use toast instead of alert)
      showToast('Form submitted successfully');
    }, 2000);

/* ---------- FORM VALIDATION ---------- */

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

  // 1) Theme toggle — create first so it always exists
  if (!document.getElementById('theme-toggle-delivery')) {
    const themeBtn = document.createElement('button');
    themeBtn.id = 'theme-toggle-delivery';
    themeBtn.textContent = '🌙 Toggle Theme';
    themeBtn.className = 'btn';
    Object.assign(themeBtn.style, {
      position: 'fixed',
      bottom: '100px',
      right: '20px',
      zIndex: '2147483647',
      pointerEvents: 'auto'
    });
    document.body.appendChild(themeBtn);
    themeBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      themeBtn.style.zIndex = '2147483647';
    });
  }

  // wrap remaining handlers to prevent one failure stopping everything
  try {
    const btn = document.getElementById('submit-delivery');
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (!validateForm()) {
          const firstInvalid = document.querySelector('.is-invalid');
          if (firstInvalid) firstInvalid.focus();
          return;
        }
        btn.disabled = true;
        btn.dataset.originalHtml = btn.innerHTML;
        btn.innerHTML = '<span class="spinner" aria-hidden="true"></span> Please wait...';
        btn.classList.add('loading');

        setTimeout(() => {
          btn.disabled = false;
          btn.innerHTML = btn.dataset.originalHtml;
          btn.classList.remove('loading');
          showToast('Form submitted successfully');
        }, 2000);
      });
    }

    const resetBtn = document.getElementById('reset-delivery');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        document.querySelectorAll('input').forEach(input => input.value = '');
        document.querySelectorAll('.is-invalid, .is-valid').forEach(el => el.classList.remove('is-invalid','is-valid'));
        document.querySelectorAll('.invalid-feedback').forEach(fb => fb.textContent = '');
      });
    }

    // COPY button for locations (no jQuery)
    const copyBtn = document.getElementById('copy-address-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', async () => {
        const addrEl = document.getElementById('location-street');
        const text = addrEl ? addrEl.textContent.trim() : '';
        if (!text) return;

        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(text);
          } else {
            // fallback: temporary textarea + execCommand
            const ta = document.createElement('textarea');
            ta.value = text;
            ta.style.position = 'fixed';
            ta.style.left = '-9999px';
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            ta.remove();
          }

          copyBtn.classList.add('copied');
          const tooltip = copyBtn.parentElement.querySelector('.copy-tooltip');
          if (tooltip) tooltip.classList.add('show');
          copyBtn.setAttribute('aria-label', 'Copied');

          setTimeout(() => {
            copyBtn.classList.remove('copied');
            if (tooltip) tooltip.classList.remove('show');
            copyBtn.setAttribute('aria-label', 'Copy address');
          }, 1600);
        } catch (err) {
          console.error('Copy failed:', err);
        }
      });
    }
  } catch (err) {
    console.error('Handler setup error:', err);
  }
});