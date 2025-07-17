/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  $("form").on('submit', function() {
    event.preventDefault();

    const formData = $(this).serialize();
    console.log(formData);

    $.ajax({ url: '/api/tweets' ,method: 'POST', data: formData })
      .then((response) => {
        console.log(response)
      }) 
      .catch((error) => {
        console.log(error)
      })
  })

})

