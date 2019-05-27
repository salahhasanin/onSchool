import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.model';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    fullName: '',
    email: '',
    password: '',
   // roles:''
  };
  userRole;
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
  constructor(private http:HttpClient,private router:Router) { }
 /////////////// add user when register ////////////////////
postUser(user:User){
  return this.http.post(environment.apiBaseUrl+'/register',user,this.noAuthHeader);
}
 /////////////// login user ////////////////////
login(authCredentials) {
  return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentials,this.noAuthHeader);
}
 /////////////// get user data after login ////////////////////
getUserProfile() {
  return this.http.get(environment.apiBaseUrl + '/userProfile');
}
////auth gurad to prevent user and teacher from access admin route/////
getUserRole() {
 this.http.get(environment.apiBaseUrl + '/userProfile').subscribe(res=>{
    this.userRole=res['user'];
  if(this.userRole.roles=="teacher" || this.userRole.roles=="user"){
    this.router.navigateByUrl('/home');
   console.log(this.userRole.roles);
   return false;
   } if(this.userRole.roles=="admin"){
   //  this.router.navigateByUrl('/adminpanel');
   }
 })
}


  //Helper Methods
  //save jwt token in browser
  setToken(token: string) {
    localStorage.setItem('token', token);
  }
//get jwt token from browser
  getToken() {
    return localStorage.getItem('token');
  }
//delete jwt token from browser
  deleteToken() {
    localStorage.removeItem('token');
  }
//get user info from token=>payload in browser 
  getUserPayload() {
    var token = this.getToken();
    if (token) {
      //atob() decode encoded data =>return token 3 item based on . and get second item [1]
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }
}
