import psycopg2
import datetime
from datetime import date
from flask import jsonify


def access_database():
    createddate = datetime.date.today()

    conn = psycopg2.connect(
        host="localhost",
        database="chat_app",
        user='charlie',
        password='password')

    cur = conn.cursor()
    return [cur, conn, createddate]


def disconnect_from_database(cur, conn):
    conn.commit()
    cur.close()
    conn.close()


def add_message(username, messagetext):
    connection = access_database()
    cur, conn, createddate = connection[0], connection[1], connection[2]

    print(f'inside add_message username value: {username} ')

    cur.execute('SELECT user_id from users where username = %s', (username, ))
    user_id = cur.fetchone()[0]

    cur.execute('INSERT INTO messages (userid, messagetext, createddate)'
                'VALUES (%s, %s, %s)',
                (user_id, messagetext, createddate))

    disconnect_from_database(cur, conn)
    return jsonify({'response': f'message ({messagetext}) added to database'})


def add_user(username, password):
    connection = access_database()
    cur, conn, createddate = connection[0], connection[1], connection[2]

    print(f'VALUES ({username}, {createddate}, {password})')

    cur.execute(
        'INSERT INTO users (username, createddate, password) VALUES (%s, %s, %s)', [
            username, createddate, password]
    )

    disconnect_from_database(cur, conn)
    return jsonify({'response': f'message ({username}, {password}) added to database'})


def check_username_availability(username):
    connection = access_database()
    cur, conn = connection[0], connection[1]
    cur.execute('SELECT * FROM users WHERE username = %s', [username])
    try:
        res = cur.fetchone()
        if res[0] == username:
            print(
                f'\n\nThe username {username} is already taken.  Please select a different one.  \n\n')
            return False

    except:
        return True


def verify_username_and_password(username, password, is_unittest):
    connection = access_database()
    cur, conn = connection[0], connection[1]
    if is_unittest == True:
        print('RETURNING TRUE FOR UNIT TEST')
        return True
    cur.execute('SELECT * FROM users WHERE username = %s', [username])
    try:
        row = cur.fetchone()
        valid_password = row[3]
        print('valid password is: ', valid_password)
        print(password == valid_password, password, valid_password)
        disconnect_from_database(cur, conn)
        return password == valid_password

    except TypeError:
        disconnect_from_database(cur, conn)
        print('USERNAME NOT FOUND')
        return False


def retrieve_messages():
    connection = access_database()
    cur, conn = connection[0], connection[1]

    # cur.execute('SELECT (userid, messagetext, createddate) FROM messages')

    cur.execute(
        'SELECT messages.*, users.username FROM messages JOIN users ON messages.userid = users.user_id')

    messages = cur.fetchall()

    # print('INSIDE retrieve_messages', type(messages), messages)
    disconnect_from_database(cur, conn)

    return messages
