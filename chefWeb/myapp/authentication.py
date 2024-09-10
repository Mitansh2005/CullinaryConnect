import pyrebase
from django.http.response import HttpResponse
config = {
  "apiKey": "AIzaSyD7WJcDRrOVKEfoe2hvfGwjTljhjS_JW4o",
  "authDomain": "chef-web-8a2f2.firebaseapp.com",
  "projectId": "chef-web-8a2f2",
  "storageBucket": "chef-web-8a2f2.appspot.com",
  "messagingSenderId": "909916564111",
  "appId": "1:909916564111:web:6a929f1d0b21f846e35efa"
}

firebase = pyrebase.initialize_app(config)

auth=firebase.auth()

def SignInWithEmailAndPassword(email,password):
  user=auth.sign_in_with_email_and_password(email,password)
  db=firebase.database()
  # Pass the user's idToken to the push method
  results = db.child("users").push(user['idToken'])
  return HttpResponse(status=200)