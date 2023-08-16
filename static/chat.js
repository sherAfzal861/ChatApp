var socket = io.connect('http://' + document.domain + ':' + location.port);

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('receive_message', function (data) {
    var messageDiv = document.createElement('div');
    messageDiv.innerText = '[' + data.username + '] ' + data.content;
    document.getElementById('messages').appendChild(messageDiv);
});
alert(username)
function sendMessage() {
    var content = document.getElementById('messageInput').value;
     // You can set the username here

    socket.emit('send_message', { content, username });

    // Clear the input field
    document.getElementById('messageInput').value = '';
}