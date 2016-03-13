export class Auth{
  firebaseUrl = "https://artlike.firebaseIO.com/";
  boolean: isLoggedIn = false;

  constructor(){
    this.ref = new Firebase(this.firebaseUrl);
    this.authData = this.ref.getAuth();
    if (this.authData != null) {
      this.isLoggedIn = true;
    }
    else{
      this.isLoggedIn = false;
    }
  }

}
