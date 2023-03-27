$(document).ready(function() {
    // Set up variables for the chatbox and input field
    var chatbox = $('#chatbox');
    var inputField = $('#inputField');
  
    // Function for adding a chat message to the chatbox
    function addChatMessage(message, isUser) {
      var messageClass = isUser ? 'user-message' : 'bot-message';
      var messageHtml = '<div class="' + messageClass + '">' + message + '</div>';
      chatbox.append(messageHtml);
    }
  
    // Function for sending a chat message to the server and receiving a response
    function sendChatMessage() {
      var message = inputField.val();
      if (message) {
        // Add the user's message to the chatbox
        addChatMessage(message, true);
  
        // Send the message to the server using AJAX
        $.getJSON('/chat/', {message: message}, function(data) {
          // Add the bot's response to the chatbox
          var response = data.response;
          addChatMessage(response, false);
  
          // Clear the input field
          inputField.val('');
        });
      }
    }
  
    // Set up event listeners for the input field and chat form
    inputField.keydown(function(event) {
      if (event.keyCode == 13) {
        event.preventDefault();
        sendChatMessage();
      }
    });
  
    $('#chatForm').submit(function(event) {
      event.preventDefault();
      sendChatMessage();
    });
  });
  