from flask import Flask, send_from_directory, send_file, jsonify, request, make_response, jsonify
from flask import request
import datetime
import jwt
from functools import wraps
import psycopg2
from flask_restful import Api, Resource, reqparse
from flask import request
# import requests
import datetime
from datetime import date
from flask_cors import CORS


app = Flask(__name__, static_folder='C:/Users/Charlie (Personal)/Desktop/SDMM/Modules/Module 11/chat-app/chat-app-front-end/build2',
            static_url_path='/')
CORS(app)
app.config['SECRET_KEY'] = "thisisthesecretkey"


@app.route('/')
def print_request():

    print('\n\n', 'HERE IS THE REQUEST FORM \n\n',
          request.cookies.get('access_token'), '\n\n', 'DATA TYPE is')
    return '<p>YOU HAVE REACHED THE ENDPOINT</p>'


app.run(debug=True)
