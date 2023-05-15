import psycopg2
import datetime
from datetime import date


def access_database():
    createddate = datetime.datetime.today()

# SECOND CONNECTION IS INTENDED FOR HOSTED POSTGRES DATABASE
    # conn = psycopg2.connect(
    #     Hostname="dpg-ch65umg2qv26p1f1n3gg-a",
    #     Port='5432',
    #     Database="chat_app_zead",
    #     Username='charlie',
    #     password='dl7yNw7AOWUmIaSLljw72id1lp3dmF2S')

# THIRD CONNECTION IS FOR USING EXTERNAL URL
    DATABASE_URL = 'postgres://charlie:dl7yNw7AOWUmIaSLljw72id1lp3dmF2S@dpg-ch65umg2qv26p1f1n3gg-a.ohio-postgres.render.com/chat_app_zead'

    conn = psycopg2.connect(DATABASE_URL)

    cur = conn.cursor()
    return [cur, conn, createddate]


def create_starting_tables():
    connection = access_database()
    cur, conn, createddate = connection[0], connection[1], connection[2]

    # Create Tables goes here
    # cur.execute()
