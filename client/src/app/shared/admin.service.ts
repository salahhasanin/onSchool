
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserDetails, TeacherDetails, UpdateUserDetails } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
selectedUser:UserDetails;
user:UserDetails[];
teacher:TeacherDetails[];

selectedUpdateUserDetails:UpdateUserDetails;
updateuser:UpdateUserDetails[];
  constructor(private http:HttpClient,private router:Router) { }
 /////////////// get all users ////////////////////
  getuserslist(){
   return this.http.get('http://localhost:4000/user/getUsers');
  }
//////////////////////update user roles ana access/////////
updateUser(user :UpdateUserDetails,_id: string){
  return this.http.put('http://localhost:4000/user/updateUser'+`/${_id}`,user); 
}

/*addAccess(user :UpdateUserDetails){
  return this.http.put('http://localhost:4000/user/updateUserAccess'+`/${user._id}`,user);  
}*/
///////////////////// delete user ////////////////////
deleteUser(_id: string) {
  return this.http.delete('http://localhost:4000/user/deleteUser' + `/${_id}`);
}
/////////////// get all teachers ////////////////////
  getteacherlist(){
    return this.http.get('http://localhost:4000/user/getTeachers');
  }
 /////////////// get all categories ////////////////////
  getCategories(){
    return this.http.get('http://localhost:4000/user/getCategory');
  }
//////////////////////get teacher that exist in category/////////
  getTeacherCat(cate){
    return this.http.get('http://localhost:4000/user/getTeacherscategory/'+cate); 
  }
 ////////////////get videos that createdby specific teacher///////// 
  getTeacherVideo(createdBy){
    return this.http.get('http://localhost:4000/video/getvideosTeacher/'+createdBy); 
  }
 ////////////////get user access for specific teacher///////// 
 getUserAccess(id){
  return this.http.get('http://localhost:4000/user/getUserAccess/'+id); 
}
////// add Categroy for user who is changed his role to teacher
addCategory(category:TeacherDetails,_id: string){
  return this.http.put('http://localhost:4000/user/addCategory'+`/${_id}`,category); 
}
}
