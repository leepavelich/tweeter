/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 */

$(() => {
  loadTweets(); // initial page load
  newTweetIconClick();  // top-right compose button
  tweetSubmission();  // compose tweet box
  scrollToTopButton();  // bottom-right scroll-to-top button
});

const createTweetElement = (tweet) => {
  const user = tweet.user;
  const timeAgo = timeago.format(tweet.created_at);

  const $tweet = `
  <article class="tweet">
    <header>
      <image class="avatar" src=${user.avatars}></image>
      <div class="name">${user.name}</div>
      <div class="handle">${user.handle}</div>
    </header>
    <div class="tweet-content">
      <p class="tweet-content-text">${escape(tweet.content.text)}</p>
    </div>
    <footer>
      <div class="days-ago">${timeAgo}</div>
      <div class="icons">
        <span><i class="fas fa-flag" id="flag"></i></span>
        <span><i class="fas fa-retweet" id="retweet"></i></span>
        <span><i class="fas fa-heart" id="like"></i></span>
      </div>
    </footer>
  </article>
  `;
  return $tweet;
};

// escape XSS
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const renderTweets = (array) => {
  const $tweetsContainer = $('.tweets-container');
  $tweetsContainer.empty();

  array.forEach(tweet => {
    const $tweet = createTweetElement(tweet);
    $tweetsContainer.prepend($tweet);
  });
};

const tweetSubmission = () => {
  const $form = $('#new-tweet-form');

  $form.submit(function(event) {
    event.preventDefault();
    const $text = $('#tweet-text');
    clearErrorMsg();

    if (validateEmpty($text)) {
      errorMsg('<span>&#9888;</span> Please enter a tweet before submitting');
      return;
    }
    if (validateTooLong($text)) {
      errorMsg('<span>&#9888;</span> Tweets can only be 140 characters or less');
      return;
    }

    const serializedTweetData = $(this).serialize();

    $.post('/tweets', serializedTweetData, () => loadTweets());
    $(this)[0].reset(); // clears the compose tweet textarea
  });
};

const loadTweets = () => {
  $.get('/tweets', renderTweets);
};

const validateEmpty = ($text) => $text.val() === '';
const validateTooLong = ($text) => $text.val().length > 140;

const errorMsg = (msg) => {
  const $errorMsg = $(".validation-error-msg");

  $errorMsg.hide().html(msg).slideDown('fast');
};

const clearErrorMsg = () => {
  $(".validation-error-msg").slideUp('fast');
};

const newTweetIconClick = () => {
  const $nav = $('.new-tweet-nav');
  const $new = $('#new-tweet-form');

  $nav.click(() => {
    $new.is(':visible') ? $new.slideUp('fast') : $new.slideDown('fast');
    $('#tweet-text').focus();
  });
};

const scrollToTopButton = () => {
  const $scrollToTop = $('.scroll-to-top');

  $(window).scroll(function() {
    $(this).scrollTop() > 200
      ? $scrollToTop.fadeIn().css('display', 'flex')
      : $scrollToTop.fadeOut();
  });

  $scrollToTop.click(() => {
    const $new = $('#new-tweet-form');
    $new.slideDown('fast');
    $('#tweet-text').focus();
  });
};
