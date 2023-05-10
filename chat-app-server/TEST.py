import unittest
import wsgi
from flask import Flask, request, make_response
from werkzeug.wrappers import Response


login, write_message, create_app = wsgi.login, wsgi.write_message, wsgi.create_app


class TestLogin(unittest.TestCase):
    def setUp(self):
        self.app = create_app()
        self.app_context = self.app.app_context()
        self.app_context.push()

    def tearDown(self):
        self.app_context.pop()

    def test_login(self):
        print('test_login STARTED')
        res = login(is_unittest=True)
        self.assertEqual(res[1], 200)
        print('test_login COMPLETE')


class TestWriteMessage(unittest.TestCase):
    def setUp(self):
        self.app = create_app()
        self.app_context = self.app.app_context()
        self.app_context.push()

    def tearDown(self):
        self.app_context.pop()

    def test_Write_Message(self):
        print('test_Write_Message STARTED')
        with self.app.test_request_context('/', headers={'MessageText': 'TESTMESSAGE'}):

            stub_response = '(<Response 35 bytes [200 OK]>, 403 )'
            print('FUNCTION RESULT IS', write_message(message_type='unittest'))
            print('STUB_RESPONSE IS', stub_response)
            print('Write_Message outputs: ',
                  write_message(message_type='unittest'))
            self.assertEqual(write_message(message_type='unittest')[1], 403)
        print('test_Write_Message COMPLETE')

    def test_failed_Write_message(self):
        pass


if __name__ == '__main__':
    unittest.main()
