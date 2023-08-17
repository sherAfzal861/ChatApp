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

const userColors = {};

function getRandomColor(username) {
    if (userColors[username]) {
        return userColors[username];
    } else {
        const colors = ['#ff5733', '#33ff6c', '#336bff', '#b733ff', '#ff33e2']; // Add more colors as needed
        const randomIndex = Math.floor(Math.random() * colors.length);
        const color = colors[randomIndex];
        userColors[username] = color; // Store the color for the user
        return color;
    }
}

function displayMessage(sender, content, isSent) {
    var messageDiv = document.createElement('div');
    messageDiv.classList.add('message');

    var usernameDiv = document.createElement('div');
    usernameDiv.innerText = sender;
    usernameDiv.style.color = getRandomColor();
    usernameDiv.classList.add('username');

    var contentDiv = document.createElement('div');
    contentDiv.innerText = content;
    contentDiv.classList.add('content');

    messageDiv.appendChild(usernameDiv);
    messageDiv.appendChild(contentDiv);

    if (isSent) {
        messageDiv.classList.add('sender-message');
    } else {
        messageDiv.classList.add('receiver-message');
    }

    var messagesContainer = document.getElementById('messages');
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll to bottom
}