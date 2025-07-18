/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  $("form").on('submit', function() {
    event.preventDefault();
    console.log('Form submitted'); 
    const formData = $(this).serialize();

    $.ajax({ url: '/api/tweets' ,method: 'POST', data: formData })
      .then((response) => {
        const newTweet = createTweetElement(response)
        $('.tweet-container').append(newTweet)
      }) 
      .catch((error) => {
        console.log(error)
      })
  })

})

const createTweetElement = object => {
  const timeAgo = timeSince(object.created_at);
  const $tweet = `<article>
  <header class="tweet-header">
    <div class="profile-picture">
      <img src=${object.user.avatars} width="50" height="50">
      <p>${object.user.name}</p>
    </div>
    <div class="profile-handle">
      <p>${object.user.handle}</p>
    </div>
  </header>
  <div>
    <p>${object.content.text}</p>
  </div>
  <footer>
    <p>${timeAgo}</p>
    <div class="engagement">
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </div>
  </footer>
</article>`

  return $tweet;
}

const timeSince = timestamp => {
  const now = Date.now();
  const difference = now - timestamp;
  
  const seconds = Math.floor(difference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
};

const renderTweets = array => {
  for (const tweets of array) {
    $('.tweet-container').append(createTweetElement(tweets))
  }
}
