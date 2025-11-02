//                NAVIGATION MENU DROPDOWN
function navDropDown() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

(function ($) {
  const THEME_KEY = 'moti_theme';

  function applyTheme(theme) {
    if (theme === 'dark') {
      $('body').addClass('dark-mode');
      $('#theme-toggle-delivery').text('☀️ Day Mode');
      $('#theme-toggle-delivery').attr('aria-pressed', 'true');
    } else {
      $('body').removeClass('dark-mode');
      $('#theme-toggle-delivery').text('🌙 Night Mode');
      $('#theme-toggle-delivery').attr('aria-pressed', 'false');
    }
  }

  // create button once if missing
  function ensureToggleButton() {
    if (!$('#theme-toggle-delivery').length) {
      $('<button/>', {
        id: 'theme-toggle-delivery',
        type: 'button',
        'class': 'btn',
        'aria-label': 'Toggle theme',
      })
        .css({ position: 'fixed', bottom: '100px', right: '20px', zIndex: 2147483647, pointerEvents: 'auto' })
        .appendTo('body')
        .on('click', function () {
          const isDark = $('body').hasClass('dark-mode');
          const newTheme = isDark ? 'light' : 'dark';
          applyTheme(newTheme);
          try { localStorage.setItem(THEME_KEY, newTheme); } catch (e) { /* ignore */ }
        });
    }
  }

  // init on DOM ready
  $(function () {
    ensureToggleButton();

    // determine initial theme: saved preference or OS preference or default light
    let saved = null;
    try { saved = localStorage.getItem(THEME_KEY); } catch (e) { saved = null; }

    if (saved === 'dark' || saved === 'light') {
      applyTheme(saved);
    } else {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      applyTheme(prefersDark ? 'dark' : 'light');
      // do not overwrite localStorage until user toggles
    }

    // ensure button text reflects current state immediately
    if ($('#theme-toggle-delivery').length) {
      const current = $('body').hasClass('dark-mode') ? 'dark' : 'light';
      applyTheme(current);
    }
  });

  // existing navDropDown function remains available globally
  window.navDropDown = window.navDropDown || function () {
    var x = document.getElementById("myLinks");
    if (x) {
      if (x.style.display === "block") x.style.display = "none"; else x.style.display = "block";
    }
  };

})(jQuery);