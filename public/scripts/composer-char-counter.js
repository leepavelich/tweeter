$(document).ready(function() {
  $('#tweet-text').keyup(function() {
    const max = 140;
    let count = $(this).val().length;

    let char = max - count;
    const counter = $(this).closest('form').find('.counter');

    if (char < 0) {
      counter.val(-char);
      counter.css('color', 'red');
    } else {
      counter.val(char);
      counter.css('color', '#545149')
    }
  })
});
