import { UserService } from './../../shared/user.service';
import { AdminService } from './../../shared/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TeacherDetails, UserDetails } from './../../shared/user.model';


@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
name;
teachername:TeacherDetails[]
userDetails;
userAccess;
  constructor(private route:ActivatedRoute,private adminservice:AdminService,
    private router:Router,private userService:UserService) { }

  ngOnInit() {
this.teachersIn()
//this.getAccess();
  }
  teachersIn(){
  this.name=this.route.snapshot.paramMap.get('name');
  this.adminservice.getTeacherCat( this.name).subscribe(res=>{
   this.teachername = res as TeacherDetails[];
  // console.log(this.teachername)
    // console.log(res);
  })
  }
/*
  myEvent(event) {
    this.router.navigate(['/teachervideo',event.target.name])
  /*  this.adminservice.getTeacherCat(event.target.name).subscribe(res=>{
      this.teachername = res as TeacherDetails[];
      console.log(res);
    })
  //  console.log(event.target.name);
  }
  */
  //function to check if user can access videos for teacher
 getAccess(event){
  this.userService.getUserProfile().subscribe(res => {
  this.userDetails = res['user'];
  this.adminservice.getUserAccess(this.userDetails._id).subscribe(res=>{
    this.userAccess=res as UserDetails[];

     for(var i=0;i<=this.userAccess.access.length;i++){

      if(event.target.name ==this.userAccess.access[i]){
        console.log("yess")
        this.router.navigate(['/teachervideo',event.target.name])
       
      }if(!event.target.name ==this.userAccess.access[i]){
        console.log("noo") 
        confirm('you can not access this teacher?')
      }
     }

  })

    });

}
}
