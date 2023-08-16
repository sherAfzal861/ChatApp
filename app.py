from flask import Flask, render_template,  request, redirect, url_for, flash
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'
socketio = SocketIO(app)

@app.route('/')
def index():
    return render_template('index.html')



@app.route('/chat')
def chat():
    username = request.args.get('username')
    if not username:
        return redirect(url_for('index'))  # Redirect if no username provided
    return render_template('chat.html', username=username)

@socketio.on('send_message')
def handle_message(data):
    content = data['content']
    username = data['username']
    
    emit('receive_message', {'content': content, 'username': username}, broadcast=True)

if __name__ == '__main__':
    socketio.run(app, debug=True)

