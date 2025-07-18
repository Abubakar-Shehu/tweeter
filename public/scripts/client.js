/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  $('.error-message').hide();

  $("form").on('submit', function() {
    const formData = $(this).serialize();
    
    const enteredData = $("#tweet-text").val().trim();

    $('.error-message').slideUp(400);

    if (enteredData === "") {
      $('.error-message p').text("Error: Tweet cannot be empty."); 
      $('.error-message').slideDown(400)
      event.preventDefault();
    } else if (enteredData.length > 140) {
      $('.error-message p').text("Error: Tweet exceeds 140 characters!"); 
      $('.error-message').slideDown(400)
      event.preventDefault();
    } else {
      event.preventDefault();

      $.ajax({ url: '/api/tweets' ,method: 'POST', data: formData })
        .then((response) => {
          const newTweet = createTweetElement(response)
          $('.tweet-container').prepend(newTweet)
          $("#tweet-text").empty()
        }) 
        .catch((error) => {
          console.log(error)
        })
    }
  })
  loadTweets();
})

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = object => {
  const timeAgo = timeago.format(object.created_at);

  const safeHTML = `<p>${escape(object.content.text)}</p>`;

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
    ${safeHTML}
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

const renderTweets = array => {
  for (const tweets of array) {
    $('.tweet-container').prepend(createTweetElement(tweets))
  }
}

const loadTweets = () => {
  $.ajax({ url: '/api/tweets' ,method: 'GET'})
  .then((response) => {
    renderTweets(response)
  }) 
  .catch((error) => {
    console.log(error)
  })
}
