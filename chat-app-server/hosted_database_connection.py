import psycopg2
import datetime
from datetime import date
import wsgi


def access_database():
    createddate = datetime.datetime.today()

    conn = psycopg2.connect(wsgi.database_url)

    cur = conn.cursor()
    return [cur, conn, createddate]


def create_starting_tables():
    connection = access_database()
    cur, conn, createddate = connection[0], connection[1], connection[2]

    # Create Tables goes here
    # cur.execute()
