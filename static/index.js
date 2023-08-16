document.getElementById('nameForm').addEventListener('submit', function (event) {
    event.preventDefault();
    var username = document.getElementById('username').value;
    window.location.href = '/chat?username=' + encodeURIComponent(username);
    alert("hello")
});