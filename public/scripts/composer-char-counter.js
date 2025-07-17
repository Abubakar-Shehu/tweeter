$(document).ready(function() {
  // --- our code goes here ---
  console.log(document)

  $("#tweet-text").on('input', function() {
    const userInput = $(this).val().length;
    const counter = $(this).next().children('.counter');
    
    const availableText = 140 - userInput;

    counter.text(availableText);

    if (availableText < 0) {
      counter.css('color', 'red')
    } else {
      counter.css('color', '#545149')
    }
  });   

  
});