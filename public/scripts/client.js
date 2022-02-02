/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 */

$(() => {
  loadTweets();
  tweetSubmission();
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
        <span><i class="fas fa-flag"></i></span>
        <span><i class="fas fa-retweet"></i></span>
        <span><i class="fas fa-heart"></i></span>
      </div>
    </footer>
  </article>
  `;
  return $tweet;
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

    if (validateEmpty($text)) {
      alert('Please enter a tweet before submission');
      return;
    };

    if (validateTooLong($text)) {
      alert('Tweets can only be 140 characters or less');
      return;
    };

    const serializedTweetData = $(this).serialize();

    $.post('/tweets', serializedTweetData, () => loadTweets());
    $(this)[0].reset();
  });
};

const loadTweets = () => {
  $.get('/tweets', renderTweets);
};

const validateEmpty = ($text) => $text.val() === '';

const validateTooLong = ($text) => $text.val().length > 140;

// escape XSS
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
