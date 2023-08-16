var socket = io.connect('http://' + document.domain + ':' + location.port);

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('receive_message', function (data) {
    if(username==data.username){
        displayMessage(username, data.content, true); // Pass `true` for sent messages
    }
    else{
        displayMessage(data.username, data.content, false);
    }
});

function sendMessage() {
    var content = document.getElementById('messageInput').value;
    socket.emit('send_message', { content, username });
    document.getElementById('messageInput').value = '';
}

function displayMessage(sender, content, isSent) {
    var messageDiv = document.createElement('div');
    messageDiv.innerText = content;
    messageDiv.classList.add('message');

    if (isSent) {
        messageDiv.classList.add('sender-message');
    } else {
        messageDiv.classList.add('receiver-message');
    }

    var messagesContainer = document.getElementById('messages');
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll to bottom
}