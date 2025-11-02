// debug: ensure jQuery loaded
if (typeof jQuery === 'undefined') {
  console.error('delivery.js: jQuery is NOT loaded - handlers will not run');
} else {
  console.log('delivery.js loaded — jQuery version', jQuery.fn.jquery);
}
$(function() {

  // Toast
  function showToast(message, duration) {
    duration = duration || 3000;
    $('.temp-toast').remove();
    var $toast = $('<div/>', { 'class': 'temp-toast', text: message }).appendTo('body');
    // force reflow then show
    window.requestAnimationFrame(function(){ $toast.addClass('show'); });
    setTimeout(function(){
      $toast.removeClass('show');
      setTimeout(function(){ $toast.remove(); }, 400);
    }, duration);
  }

  // Validation
  function validateForm() {
    var rules = [
      { id: 'street',     test: function(v){ return v.length >= 3; }, msg: 'Enter a valid street (min 3 chars).' },
      { id: 'entrance',   test: function(v){ return v.length > 0; },  msg: 'Entrance is required.' },
      { id: 'intercom',   test: function(v){ return v.length > 0; },  msg: 'Intercom is required.' },
      { id: 'floor',      test: function(v){ return /^\d+$/.test(v); }, msg: 'Floor must be a number.' },
      { id: 'apartment',  test: function(v){ return /^\d+$/.test(v); }, msg: 'Apartment must be a number.' }
    ];

    var allValid = true;
    $.each(rules, function(_, rule){
      var $el = $('#' + rule.id);
      if (!$el.length) return;
      var value = ($el.val() || '').trim();
      var ok = rule.test(value);

      var $feedback = $el.parent().find('.invalid-feedback');
      if (!$feedback.length) {
        $feedback = $('<div/>', { 'class': 'invalid-feedback' }).appendTo($el.parent());
      }

      if (!ok) {
        $el.addClass('is-invalid').removeClass('is-valid');
        $feedback.text(rule.msg);
        allValid = false;
      } else {
        $el.removeClass('is-invalid').addClass('is-valid');
        $feedback.text('');
      }
    });

    return allValid;
  }

  // Submit handler
  $(document).on('click', '#submit-delivery', function(e){
    e.preventDefault();
    var $btn = $(this);
    if (!validateForm()) {
      var $first = $('.is-invalid').first();
      if ($first.length) $first.focus();
      return;
    }

    $btn.prop('disabled', true);
    $btn.data('originalHtml', $btn.html());
    $btn.html('<span class="spinner" aria-hidden="true"></span> Please wait...');
    $btn.addClass('loading');

    setTimeout(function(){
      $btn.prop('disabled', false);
      $btn.html($btn.data('originalHtml'));
      $btn.removeClass('loading');
      showToast('Form submitted successfully');
    }, 2000);
  });

  // Reset handler
  $(document).on('click', '#reset-delivery', function(){
    $('input').val('');
    $('.is-invalid, .is-valid').removeClass('is-invalid is-valid');
    $('.invalid-feedback').text('');
  });

  // Copy address button (locations page)
  $(document).on('click', '#copy-address-btn', function(){
    var $btn = $(this);
    var text = $.trim($('#location-street').text() || '');
    if (!text) return;

    // prefer Clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function(){
        $btn.addClass('copied');
        var $tip = $btn.parent().find('.copy-tooltip');
        if ($tip.length) $tip.addClass('show');
        $btn.attr('aria-label','Copied');
        setTimeout(function(){
          $btn.removeClass('copied');
          if ($tip.length) $tip.removeClass('show');
          $btn.attr('aria-label','Copy address');
        }, 1600);
      }).catch(function(err){
        console.error('Clipboard API failed:', err);
      });
      return;
    }

    // fallback: temporary textarea + jQuery .on('copy')
    var $ta = $('<textarea/>').val(text).css({ position: 'fixed', left: '-9999px' }).appendTo('body');
    $ta.on('copy', function(e){
      var ev = e.originalEvent || e;
      if (ev.clipboardData) {
        ev.clipboardData.setData('text/plain', text);
        ev.preventDefault();
      } else if (window.clipboardData) {
        window.clipboardData.setData('Text', text);
        ev.preventDefault();
      }
    });
    $ta.select();
    try {
      document.execCommand('copy');
      $btn.addClass('copied');
      var $tip2 = $btn.parent().find('.copy-tooltip');
      if ($tip2.length) $tip2.addClass('show');
      $btn.attr('aria-label','Copied');
      setTimeout(function(){
        $btn.removeClass('copied');
        if ($tip2.length) $tip2.removeClass('show');
        $btn.attr('aria-label','Copy address');
      }, 1600);
    } catch (err) {
      console.error('execCommand copy failed:', err);
    }
    $ta.remove();
  });

});