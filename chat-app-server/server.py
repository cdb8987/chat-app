
from flask import Flask, send_from_directory, send_file, jsonify, request, make_response, jsonify
from flask import request
import datetime
import jwt
from flask_jwt_extended import create_access_token
from functools import wraps
from flask_restful import Api, Resource, reqparse
from flask import request
import database_functions


app = Flask(__name__, static_folder='C:/Users/Charlie (Personal)/Desktop/SDMM/Modules/Module 11/chat-app/chat-app-front-end/build',
            static_url_path='/')

app.config['SECRET_KEY'] = "thisisthesecretkey"

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
        except:
            return jsonify({'message': 'Token is invalid'}), 403

        return f(*args, **kwargs)
    return decorated


@app.post('/login')
def login():

    submitted_username = request.headers.get('Username')
    submitted_password = request.headers.get('Password')

    db_request = {'request_type': 'retrieve_username_password_pair',
                  'username': submitted_username, 'password': submitted_password}
    print('server function evaluates to:',
          database_functions.access_database(db_request))

    if database_functions.access_database(db_request):

        access_token = jwt.encode(
            {'user': request.headers.get('Username'), 'exp': datetime.datetime.utcnow()+datetime.timedelta(minutes=30)}, app.config['SECRET_KEY'])
        print("\npassword matched!!\n TOKEN GENERATED: \n", access_token)

        response = jsonify({'login': True})
        response.set_cookie('access_token', access_token,
                            httponly=True)  # Set HttpOnly to True
        print(request.headers.get('username'), request.headers.get('Password'))
        return response, 200
    print('\npassword did NOT match!!\n')
    return make_response('Could not Verify', 401, {'WWW-Authenticate': 'Basic realm="login required"'})


@app.route("/")
def index():
    return send_from_directory('C:/Users/Charlie (Personal)/Desktop/SDMM/Modules/Module 11/chat-app/chat-app-front-end/build', 'index.html')


@app.get("/messages")
@token_required
def retrieve_messages():
    return [f'There are currently {len(dummyMessageData)} messages.  ', dummyMessageData]


@app.post("/messages")
def write_message():

    # newMessage = request.args['user']
    # dummyMessageData.append(newMessage)
    # print(request.headers)
    return jsonify({'message': 'you have reached the write_message endpoint'})


@app.get("/users")
@token_required
def retrieve_users():

    return '<p>Get Users Function Executed</p>'


@app.post("/users")
def create_user():
    new_username = request.headers.get('Username')
    new_password = request.headers.get('Password')
    print("This profile will be added to the user database:  \n",
          new_username, new_password)
    db_request = {'request_type': 'add_user', 'username': new_username,
                  'password': new_password, 'message_text': None}
    database_functions.access_database(db_request)

    return '<p>Create User function executed.</p>'


@app.route("/users")
def hello_world():
    return "Return single user function executed"


app.run(debug=True)
