
from flask import Flask, send_from_directory, send_file, jsonify, request, make_response, jsonify
from flask import request
import datetime
import jwt
from flask_jwt_extended import create_access_token
from functools import wraps
from flask_restful import Api, Resource, reqparse
from flask import request
import database_functions
import time


def create_app():
    app = Flask(__name__, static_folder='C:/Users/Charlie (Personal)/Desktop/SDMM/Modules/Module 11/chat-app/chat-app-front-end/build',
                static_url_path='/')
    app.config['SECRET_KEY'] = "thisisthesecretkey"
    return app


app = Flask(__name__, static_folder='C:/Users/Charlie (Personal)/Desktop/SDMM/Modules/Module 11/chat-app/chat-app-front-end/build',
            static_url_path='/')
app.config['SECRET_KEY'] = "thisisthesecretkey"

database_functions.create_tables()


generated_tokens_log = []
token_blacklist = []
times_messages_requested = 0
times_users_requested = 0

dummyMessageData = [
    {'id': 1,
     'username': 'Andy S',
     'text': 'Hey There'
     },
    {'id': 2,
     'username': 'Andy S',
     'text': 'Hows everyone doing?'
     },
    {'id': 3,
     'username': 'Andy S',
     'text': 'So glad this chatt is running'
     },
    {'id': 4,
     'username': 'you',
     'text': 'I know me too!'
     },
    {'id': 5,
     'username': 'you',
     'text': 'this is a lot of fun'
     }
]


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.cookies.get('access_token')

        if not token:
            return jsonify({'message': 'missing access token'}), 403

        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], ["HS256"])
            print(data)
            if token in token_blacklist:
                return jsonify({'message': 'Token is blacklisted/revoked'}), 403
        except:
            return jsonify({'message': 'Token is invalid'}), 403

        return f(*args, **kwargs)
    return decorated


@app.post('/login')
def login(is_unittest=False):

    if is_unittest:
        submitted_username = 'TESTUSERNAME'
        submitted_password = 'TESTPASSWORD'
        expiration = '1682691346'
        print('UNIT TESTING LOGIN FUNCTION')
    else:
        submitted_username = request.headers.get('Username')
        submitted_password = request.headers.get('Password')
        expiration = datetime.datetime.utcnow()+datetime.timedelta(minutes=30)

    if database_functions.verify_username_and_password(
            submitted_username, submitted_password, is_unittest):

        access_token = jwt.encode(
            {'user': submitted_username, 'exp': expiration}, app.config['SECRET_KEY'])
        print("\npassword matched!!\n TOKEN GENERATED: \n", access_token)
        generated_tokens_log.append(access_token)

        response = jsonify({'login': True})
        response.set_cookie('access_token', access_token,
                            httponly=True)  # Set HttpOnly to True
        print(submitted_username, submitted_password)
        print('Here is the return value', response, 200)
        return response, 200
    else:
        return jsonify({'message': 'That username/password combination does not match our records.'})


@app.get('/logout')
@token_required
def logout():

    token = request.cookies.get('access_token')
    token_blacklist.append(token)
    print(f'Current Token blacklist: {token_blacklist}')
    return jsonify({'message': 'your token is blacklisted and you are logged out'})


@app.route("/")
def index():

    return send_from_directory('C:/Users/Charlie (Personal)/Desktop/SDMM/Modules/Module 11/chat-app/chat-app-front-end/build', 'index.html')


@app.get("/messages")
@token_required
def retrieve_messages():
    times_messages_requested = + 1
    message_data = database_functions.retrieve_messages()
    # print(type(message_data), message_data)
    # print('time_messages_requested', times_messages_requested)
    return jsonify(message_data)

    # return [f'There are currently {len(dummyMessageData)} messages.  ', dummyMessageData]


@app.post("/messages")
@token_required
def write_message(is_unittest=False):

    print('\n\nwrite_message function EXECUTED\n\n')
    # newMessage = request.args['user']
    # dummyMessageData.append(newMessage)
    token = request.cookies.get('access_token')

    if is_unittest:
        data = jwt.decode(token, app.config['SECRET_KEY'], [
            "HS256"], options={"verify_exp": False})
        messagetext = 'TESTMESSAGE'
    else:
        data = jwt.decode(token, app.config['SECRET_KEY'], ["HS256"])
        messagetext = request.headers.get('MessageText')

    username = data['user']

    database_functions.add_message(username, messagetext)

    status_message = f'writemessage function successfully executed. {username} wrote {messagetext} to the database.'
    print(username, 'wrote', messagetext)
    return jsonify({'message': status_message})


@app.get("/users")
@token_required
def get_loggedin_user_list():
    active_users = []
    for i in generated_tokens_log:
        try:
            valid_user = jwt.decode(i, app.config['SECRET_KEY'], ["HS256"])
            if i not in token_blacklist:
                active_users.append(valid_user['user'])
        except:
            continue

    # print('ACTIVE USERS:', active_users)
    # print('times_users_requested ', times_users_requested)
    return list(set(active_users))


@app.post("/users")
def create_user():
    new_username = request.headers.get('Username')
    new_password = request.headers.get('Password')
    print("Making request to add this user-password pair to database:  \n",
          new_username, new_password)

    if database_functions.check_username_availability(new_username):
        database_functions.add_user(new_username, new_password)
        return jsonify({'message': 'New User Created'})
    else:
        print('USER NOT ADDED.  CONFLICT')
        return jsonify({'message': 'USER NOT ADDED.  THIS USERNAME IS NOT AVAILABLE. '})


app.run(debug=True)
