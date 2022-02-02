/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(() => {
  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
    "created_at": 1461116232227
  }
  
  const $tweet = createTweetElement(tweetData);

  $('.container').append($tweet);
})

const createTweetElement = (tweet) => {
  const user = tweet.user;
  const markup = `
  <article class="tweet">
    <header>
      <image class="avatar" src=${user.avatars}></image>
      <div class="name">${user.name}</div>
      <div class="handle">${user.handle}</div>
    </header>
    <div class="tweet-content">
      <p class="tweet-content-text">${tweet.content.text}</p>
    </div>
    <footer>
      <div class="days-ago">${tweet.created_at}</div>
      <div class="icons">
        <span><i class="fas fa-flag"></i></span>
        <span><i class="fas fa-retweet"></i></span>
        <span><i class="fas fa-heart"></i></span>
      </div>
    </footer>
  </article>
  `;
  return markup;
}