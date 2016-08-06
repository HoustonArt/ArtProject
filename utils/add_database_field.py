import pyrebase
import argparse
import traceback

config = {
    'apiKey': "AIzaSyAZ35SfNAcOJV7Jc6jbsofyJLhigV8R52c",
    'authDomain': "artlike.firebaseapp.com",
    'databaseURL': "https://artlike.firebaseio.com",
    'storageBucket': "firebase-artlike.appspot.com",
    #"serviceAccount":"/home/zglass/Documents/Projects/ArtLike-e8a8d5e75805.json"
  }


def main(args):
    email = args.email
    password = args.password
    firebase = pyrebase.initialize_app(config)
    auth = firebase.auth()
    _user = auth.sign_in_with_email_and_password(email, password)
    db = firebase.database()
    all_users = db.child('users').get()
    #loop through users, acess child works
    for user in all_users.each():
        use_key = user.key()
        works = db.child('users').child(use_key).child('Works').get()
        try:
            for work in works.each():
                db.child('users').child(use_key).child('Works').child(work.key()).update({"sold":"false"},
                                                                                         _user['idToken'])
        except:
            tb = traceback.format_exc()
            print(tb)



if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('email')
    parser.add_argument('password')
    args = parser.parse_args()
    main(args)
