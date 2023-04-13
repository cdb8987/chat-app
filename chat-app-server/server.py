
from flask import Flask
from flask import request

app = Flask(__name__)

@app.get("/messages")
def retrieve_messages():
    return '<p>Get Message Function Executed</p>'

@app.post("/messages")
def write_message():
    return '<p>POST Message Function Executed</p>'

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

