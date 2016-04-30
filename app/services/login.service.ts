import {Injectable} from 'angular2/core';

@Injectable()
export class LoginService {
    private ref: any;
    private authData: any;
    
    constructor(){
        this.ref = new Firebase("https://artlike.firebaseIO.com/");
    }
    
    getLogin(){
        //need to do later
        var i = 2;
    }
    
    getUID() {
        return Promise.resolve(this.ref.onAuth((authData)=>{this.authData = authData})).then(
            ()=> {
                return Promise.resolve(this.authDataCallBack(this.authData));
                
            }
         );
    }

    authDataCallBack(authData) {
        if (authData) {
          var isLoggedIn = true;
          var uid = authData.uid;
        } else {
          var isLoggedIn = false;
          var uid = null;
        }
        return {isLoggedIn, uid};
    }
    
    resetPassword(email:string){
        return Promise.resolve(this.ref.resetPassword({'email':email},()=>{}).catch((err)=>{
            return Promise.resolve(err);
            }));
    }
    
    changePassword(email:string,oldPassword:string,newPassword:string){
        return Promise.resolve(this.ref.changePassword({
            'email':email,
            'oldPassword':oldPassword,
            'newPassword':newPassword
        },()=>{}).catch((error)=>{
            return Promise.resolve(error);
        }));
    }
}