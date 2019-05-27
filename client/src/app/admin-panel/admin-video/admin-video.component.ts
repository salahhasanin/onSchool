import { Router } from '@angular/router';
import {TeacherDetails } from './../../shared/user.model';
import { AdminService } from './../../shared/admin.service';
import { VideoService } from './../../shared/video.service';
import { Component, OnInit } from '@angular/core';
import { Video } from '../../shared/video.model';
import { NgForm } from '@angular/forms';


//declare var M: any;
@Component({
  selector: 'app-admin-video',
  templateUrl: './admin-video.component.html',
  styleUrls: ['./admin-video.component.css']
})
export class AdminVideoComponent implements OnInit {
 
  
constructor(private videoservice:VideoService,private adminservice:AdminService,private route:Router) { }
  myData: any[] = [];
  s="https://www.youtube.com/embed/";
//  teachername:TeacherDetails[]
  ngOnInit() {
    this.resetForm();

this.ongetteacher();
/*this.adminservice.getCategories().subscribe((res:any[])=>{
  this.myData=res;
   //console.log(res);
  })*/
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.videoservice.selectvideo = {
      _id: "",
      title: "",
      url: "",
      description: "",
      createdBy: ""
    }
  }

  onSubmit(form: NgForm){
    this.videoservice.postVideo(form.value).subscribe(res=>{
      this.resetForm(form);
      console.log(res)
    //  M.toast({ html: 'Saved successfully', classes: 'rounded' });

    },(err)=>{console.log('there is error here'+err)})
  }
  ongetteacher(){
    this.adminservice.getteacherlist().subscribe(res => {
      this.adminservice.teacher = res as TeacherDetails[];
      
  //console.log(this.adminservice.teacher);
  });
  }
   /* 
  myEvent(event) {
    this.route.navigate(['/teacher',event.target.name])
 this.adminservice.getTeacherCat(event.target.name).subscribe(res=>{
      this.teachername = res as TeacherDetails[];
      console.log(this.teachername)
      // console.log(res);
    })
  //  console.log(event.target.name);
  }*/
}
