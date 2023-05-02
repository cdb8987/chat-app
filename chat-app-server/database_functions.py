import psycopg2
import datetime
from datetime import date
from flask import jsonify
import hosted_database_connection


access_database = hosted_database_connection.access_database
# CODE BELOW FOR LOCAL POSTGRES CONNECTION ONLY
# def access_database():
#     createddate = datetime.date.today()

#     conn = psycopg2.connect(
#         host="localhost",
#         database="chat_app",
#         user='charlie',
#         password='password')

#     cur = conn.cursor()
#     return [cur, conn, createddate]


def disconnect_from_database(cur, conn):
    conn.commit()
    cur.close()
    conn.close()


def create_tables():
    try:
        connection = access_database()
        cur, conn, createddate = connection[0], connection[1], connection[2]
        sql = '''CREATE TABLE IF NOT EXISTS users(username text unique, createddate date, user_id SERIAL PRIMARY KEY, password text);
    CREATE TABLE IF NOT EXISTS messages (
        referenceid SERIAL PRIMARY KEY, 
        userid INTEGER, 
        messagetext TEXT, 
        createddate DATE, 
        CONSTRAINT check_user_exists
            FOREIGN KEY(userid)
                REFERENCES users(user_id)
    )'''
        cur.execute(sql)
        disconnect_from_database(cur, conn)
    except:
        print('create_tables function FAILED')


def add_message(username, messagetext):
    try:
        connection = access_database()
        cur, conn, createddate = connection[0], connection[1], connection[2]
        cur.execute(
            'SELECT user_id from users where username = %s', (username, ))
        user_id = cur.fetchone()[0]
        cur.execute('INSERT INTO messages (userid, messagetext, createddate)'
                    'VALUES (%s, %s, %s)',
                    (user_id, messagetext, createddate))

        disconnect_from_database(cur, conn)
        return jsonify({'response': f'message ({messagetext}) added to database'})
    except:
        print('add_message FAILED')


def add_user(username, password):

    try:
        connection = access_database()
        cur, conn, createddate = connection[0], connection[1], connection[2]
        cur.execute(
            'INSERT INTO users (username, createddate, password) VALUES (%s, %s, %s)', [
                username, createddate, password]
        )
    except:
        print('add_user function FAILED')

    disconnect_from_database(cur, conn)
    try:
        return jsonify({'response': f'message ({username}, {password}) added to database'})
    except:
        print('disconnect_from_database function FAILED')


def check_username_availability(username):
    try:
        connection = access_database()
        cur, conn = connection[0], connection[1]
        cur.execute('SELECT * FROM users WHERE username = %s', [username])
        try:
            res = cur.fetchone()
            if res[0] == username:
                return False

        except:
            return True
    except:
        print('check_username_availability function FAILED')


def verify_username_and_password(username, password, is_unittest):
    try:
        connection = access_database()
        cur, conn = connection[0], connection[1]
        if is_unittest == True:
            return True

        cur.execute('SELECT * FROM users WHERE username = %s', [username])
        try:
            row = cur.fetchone()
            valid_password = row[3]
            disconnect_from_database(cur, conn)
            return password == valid_password

        except TypeError:
            disconnect_from_database(cur, conn)
            print('USERNAME NOT FOUND')
            return False
    except:
        print('verify_username_and_password function FAILED')


def retrieve_messages():
    try:
        connection = access_database()
        cur, conn = connection[0], connection[1]
        cur.execute(
            'SELECT messages.*, users.username FROM messages JOIN users ON messages.userid = users.user_id')

        messages = cur.fetchall()
        disconnect_from_database(cur, conn)

        return messages
    except:
        print('retrieve_messages function FAILED')
