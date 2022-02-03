$(document).ready(function() {
  $('#tweet-text').keyup(function() {
    const max = 140;
    let count = $(this).val().length;

    let char = max - count;
    const counter = $(this).closest('form').find('.counter');

    char < 0
      ? counter.val(-char).css('color', 'red')
      : counter.val(char).css('color', '#545149');
  });
});
