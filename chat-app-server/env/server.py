
from flask import Flask, send_from_directory, send_file, jsonify, request, make_response
from flask import request
import datetime
import jwt
from functools import wraps


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
        token = request.args.get('token')
        
        if not token:
            return jsonify({'message': 'missing access token'}), 403

        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], ["HS256"])
            print(data)
        except:
            return jsonify({'message': 'Token is invalid'}), 403

        return f(*args, **kwargs)
    return decorated

@app.route('/login')
def login():
    auth = request.authorization
    if auth and auth.password == 'password':
        token = jwt.encode(
            {'user': auth.username, 'exp': datetime.datetime.utcnow()+datetime.timedelta(minutes=30)}, app.config['SECRET_KEY']) 
    
        return jsonify({'token': token})

    return make_response('Could not Verify', 401, {'WWW-Authenticate': 'Basic realm="login required"'})


@app.route("/")
@token_required
def index():
    return send_from_directory('C:/Users/Charlie (Personal)/Desktop/SDMM/Modules/Module 11/chat-app/chat-app-front-end/build', 'index.html')


@app.get("/messages")
def retrieve_messages():
    return [f'There are currently {len(dummyMessageData)} messages.  ', dummyMessageData]


@app.post("/messages")
def write_message():
    # newMessage = request.args['user']
    # dummyMessageData.append(newMessage)
    # print(request.headers)
    return


@app.get("/users")
def retrieve_users():
    return '<p>Get Users Function Executed</p>'


@app.post("/users")
def create_user():
    return '<p>Create User function executed.</p>'


@app.route("/users")
def hello_world():
    return "Return single user function executed"


app.run()
