import pyrebase
import argparse

config = {
    'apiKey': "AIzaSyAZ35SfNAcOJV7Jc6jbsofyJLhigV8R52c",
    'authDomain': "artlike.firebaseapp.com",
    'databaseURL': "https://artlike.firebaseio.com",
    'storageBucket': "firebase-artlike.appspot.com",
  }
  
  


def main(args):
    email = args.email
    password = args.password
    firebase = pyrebase.initialize_app(config)
    auth = firebase.auth()
    user = user.sign_in_with_email_and_password(email, password)
    
if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('email')
    parser.add_argument('password')
    args = parser.parse_args()
    main(args)
    