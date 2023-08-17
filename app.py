from config import socketio, app, db
from flask import render_template, request, redirect, url_for
from flask_socketio import emit
from models import Users
@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        email = request.form.get('email')
        password= request.form.get("password")
        user = Users.query.filter_by(email=email, password=password).first()

        if user:
            return redirect(url_for('chat', username=user.first_name+user.last_name))
        else:
            message = "User not present. Please check your email or sign up."
            return render_template('login.html', message=message)
    return render_template('login.html', message=None)

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        first_name = request.form.get('first_name')
        last_name = request.form.get('last_name')
        email = request.form.get('email')
        password = request.form.get('password')
        
        new_user = Users(first_name=first_name, last_name=last_name, email=email, password=password)
        db.session.add(new_user)
        db.session.commit()
        
        return redirect(url_for('chat', username= first_name+last_name))  # Redirect to login page after successful signup
    
    return render_template('signup.html')

@app.route('/chat/<username>')
def chat(username):
    return render_template('chat.html', username=username)

@socketio.on('send_message')
def handle_message(data):
    content = data['content']
    username = data['username']
    
    emit('receive_message', {'content': content, 'username': username}, broadcast=True)

if __name__ == '__main__':
    socketio.run(app,debug=True)

