
import autopep8
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

hosted_url = 'https://chat-app-joqt.onrender.com'

build_file_path = '../chat-app-front-end/build'


def create_app():
    app = Flask(__name__, static_folder=build_file_path,
                static_url_path='/')
    app.config['SECRET_KEY'] = "thisisthesecretkey"
    return app


app = Flask(__name__, static_folder=build_file_path,
            static_url_path='/')
app.config['SECRET_KEY'] = "thisisthesecretkey"

database_functions.create_tables()
# database_functions.add_channel('charlie', 'Coffee')

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
            if token in token_blacklist:
                return jsonify({'message': 'Token is blacklisted/revoked'}), 403
        except:
            return jsonify({'message': 'Token is invalid'}), 403

        return f(*args, **kwargs)
    return decorated


@app.post('/login')
def login(is_unittest=False):
    try:
        if is_unittest:
            submitted_username = 'TESTUSERNAME'
            submitted_password = 'TESTPASSWORD'
            expiration = '1682691346'
        else:
            submitted_username = request.headers.get('Username')
            submitted_password = request.headers.get('Password')
            expiration = datetime.datetime.utcnow()+datetime.timedelta(minutes=30)

        if database_functions.verify_username_and_password(
                submitted_username, submitted_password, is_unittest):

            access_token = jwt.encode(
                {'user': submitted_username, 'exp': expiration}, app.config['SECRET_KEY'])

            clean_redundant_tokens(submitted_username)
            generated_tokens_log.append(access_token)

            response = jsonify({'login': True})
            response.set_cookie('access_token', access_token,
                                httponly=True)  # Set HttpOnly to True
            response.set_cookie('username', submitted_username)

            return response, 200
        else:
            return jsonify({'message': 'That username/password combination does not match our records.'})
    except:
        print('LOGIN FUNCTION FAILED')


def clean_redundant_tokens(submitted_username):
    try:
        for item in generated_tokens_log:
            data = jwt.decode(item, app.config['SECRET_KEY'], ["HS256"])
            print(generated_tokens_log)
            print('Data is type', type(data))
            if data['user'] == submitted_username:
                print(item)
                generated_tokens_log.remove(item)
    except:
        print('clean_redundant_tokens function FAILED')


@app.get('/logout')
@token_required
def logout():
    try:
        token = request.cookies.get('access_token')
        token_blacklist.append(token)

        response = jsonify(
            {'message': 'your token is blacklisted and you are logged out'})
        # Set HttpOnly to True
        response.set_cookie('access_token', '', httponly=True)
        return response, 200

    except:
        print('LOGOUT function FAILED')


@app.route("/")
def index():
    try:
        return send_from_directory(build_file_path, 'index.html')
    except:
        print('index function FAILED')


@app.get("/messages")
@token_required
def retrieve_messages():
    # print(request.headers)
    request_type = request.args.get('requestType')
    message_type = request.args.get('MessageType')
    # print("message_type is:", message_type)

    if request_type == 'longpoll':
        pass

    try:
        if message_type == 'channel':
            channel_id = request.args.get('ChannelId')
            sql = 'SELECT messages.referenceid, messages.userid, messages.messagetext, messages.createddate, users.username FROM messages JOIN users ON messages.userid = users.user_id WHERE channel_id = %s'
            values = (channel_id,)
        elif message_type == 'DirectMessage':
            token = request.cookies.get('access_token')
            data = jwt.decode(token, app.config['SECRET_KEY'], [
                "HS256"], options={"verify_exp": False})
            userName = data['user']
            FriendUsername = request.args.get('FriendUsername')
            print(request.args)
            print(f'\n\n\n\nFriendUsername is {FriendUsername}')

            sql = "SELECT messages.referenceid, messages.userid, messages.messagetext, messages.createddate, users.username FROM messages JOIN users ON messages.userid = users.user_id WHERE (recipient_user_id = (SELECT user_id FROM users WHERE username = %s) AND username = %s) OR (recipient_user_id = (SELECT user_id FROM users WHERE username = %s) AND username = %s)"
            values = (userName, FriendUsername, FriendUsername, userName)

            # This query has been tested and filters for all messages to or from a given user.  The easiest way will probably be to simply return all the results as given by psql and then filter them in python (so you can see them.  )
            '''SELECT messages.referenceid, messages.userid, messages.messagetext, messages.createddate, users.username FROM messages JOIN users ON messages.userid = users.user_id 
WHERE (recipient_user_id = (SELECT user_id FROM users WHERE username = 'cdb8987')  
OR (recipient_user_id > 0) AND username = 'cdb8987')'''

        # print(sql, values)
        message_data = sorted(database_functions.retrieve_messages(
            sql, values), key=lambda x: x[0])
        print('\n\n\n\n', message_data, '\n\n\n\n')
        # print(message_data)
        # print('Here are the retrieved messages:', message_data)
        return jsonify(message_data)
        # returns data type: <class 'flask.wrappers.Response'>
    except:
        print('retrieve_messages function FAILED')


@app.post("/messages")
@token_required
def write_message(message_type='channel'):
    if request.headers.get('MessageType'):
        message_type = request.headers.get('MessageType')
        # print('\n\n\n\n\n\n\n\n\n\n\n\n\n', message_type, '\n\n\n\n\n\n\n')

    try:
        token = request.cookies.get('access_token')

        if message_type == 'unittest':
            data = jwt.decode(token, app.config['SECRET_KEY'], [
                "HS256"], options={"verify_exp": False})
            messagetext = 'TESTMESSAGE'
            username = data['user']
            database_functions.add_message(username, messagetext)

        elif message_type == 'channel':
            data = jwt.decode(token, app.config['SECRET_KEY'], ["HS256"])
            messagetext = request.headers.get('MessageText')
            Channel_id = str(request.headers.get('ChannelId'))
            if messagetext == '':
                return jsonify({'message': 'Messagetext cannot be blank.'})
            username = data['user']
            database_functions.add_message(
                username, messagetext, message_type=message_type, Channel_id=Channel_id)

        elif message_type == 'DirectMessage':
            # print('\n\n\n\n\n DirectMessage boolean triggered \n\n\n\n\n\n\n')
            data = jwt.decode(token, app.config['SECRET_KEY'], ["HS256"])
            messagetext = request.headers.get('MessageText')
            recipient_username = str(request.headers.get('FriendUsername'))
            if messagetext == '':
                return jsonify({'message': 'Messagetext cannot be blank.'})
            username = data['user']

            print(
                f'\n\n\n\n\nData being passed into add message function: messagetext  {messagetext}, recipient_username {recipient_username}, username {username}, messagetype {message_type}\n\n\n\n\n')

            database_functions.add_message(
                username, messagetext, message_type=message_type, recipient_username=recipient_username)
            most_recent_message_update = time.time()
        else:
            raise 'message type not specified'

        status_message = f'writemessage function successfully executed. {username} wrote {messagetext} to the database.'
        return jsonify({'message': status_message})
    except:
        print('write_message function FAILED')


@app.get("/users")
@token_required
def get_user_list():
    try:
        sql = "SELECT username FROM users"
        values = ('', )

        return jsonify(database_functions.retrieve_users(sql, values))

    except:
        print('get_user_list FAILED')


@app.get("/onlineusers")
@token_required
def get_loggedin_user_list():

    try:
        active_users = []
        for i in generated_tokens_log:
            try:
                valid_user = jwt.decode(i, app.config['SECRET_KEY'], ["HS256"])
                if i not in token_blacklist:
                    active_users.append(valid_user['user'])
            except:
                continue

        return list(set(active_users))
    except:
        print('get_loggedin_user_list FAILED')


@app.post("/users")
def create_user():
    try:
        new_username = request.headers.get('Username')
        new_password = request.headers.get('Password')
        if new_username == '' or new_password == '':
            return jsonify({'message': 'Both Username and Password Fields must contain a value.'})

        if database_functions.check_username_availability(new_username):
            database_functions.add_user(new_username, new_password)
            return jsonify({'message': 'New User Created'})
        else:
            print('USER NOT ADDED.  CONFLICT')
            return jsonify({'message': 'USER NOT ADDED.  THIS USERNAME IS NOT AVAILABLE. '})
    except:
        print('create_user function FAILED')


@app.get("/channels")
@token_required
def retrieve_channels():
    try:

        sql = 'SELECT channel_id, channel_name FROM channels'
        values = None
        channel_data = database_functions.retrieve_messages(sql, values)
        # print('Here are the retrieved channels:', channel_data)
        return jsonify(channel_data)

    except:
        print('retrieve_messages function FAILED')

# app.run(debug=True)
