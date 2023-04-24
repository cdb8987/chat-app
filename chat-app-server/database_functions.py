import psycopg2
import datetime
from datetime import date
from flask import jsonify


def access_database(db_request):
    '''Format of db_request:
    db_request = {request_type: '', username: '', password: '', message_text: '' }'''

    createddate = datetime.date.today()

    conn = psycopg2.connect(
        host="localhost",
        database="chat_app",
        user='charlie',
        password='password')

    cur = conn.cursor()

    def add_message(cur, conn, username, messagetext, createddate):
        cur.execute('INSERT INTO messages (userid, messagetext, createddate)'
                    'VALUES (%s, %s, %s)',
                    (
                        3,
                        f'{messagetext}, sincerely... {username}',
                        createddate)
                    )
        conn.commit()

        cur.close()
        conn.close()
        return jsonify({'response': f'message ({messagetext}) added to database'})

    def add_user(cur, conn, username, createddate, password):

        print(f'VALUES ({username}, {createddate}, {password})')

        cur.execute(
            'INSERT INTO users (username, createddate, password) VALUES (%s, %s, %s)', [
                username, createddate, password]


        )

        conn.commit()

        cur.close()
        conn.close()
        return jsonify({'response': f'message ({username}, {password}) added to database'})

    def retrieve_messages(cur, conn):
        cur.execute('SELECT * FROM messages')
        messages = cur.fetchall()
        conn.commit()

        cur.close()
        conn.close()
        return jsonify(messages)

    # return retrieve_messages(cur, conn)

    if db_request['request_type'] == 'add_user':
        add_user(cur, conn, db_request['username'],
                 createddate, db_request['password'])
