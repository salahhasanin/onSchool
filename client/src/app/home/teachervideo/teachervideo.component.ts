import { NgForm } from '@angular/forms';

import { UserService } from './../../shared/user.service';
import { VideoService } from './../../shared/video.service';
import { Video, likevideo, commentvideo } from './../../shared/video.model';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from './../../shared/admin.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-teachervideo',
  templateUrl: './teachervideo.component.html',
  styleUrls: ['./teachervideo.component.css']
})
export class TeachervideoComponent implements OnInit {
name;
userDetails;
video:Video[]
vid:likevideo;
  constructor(private adminservice:AdminService,
    private route:ActivatedRoute,
    private videoService:VideoService,
  private userService:UserService ) { }

  ngOnInit() {
    this.showVideos()
    this.getUser()
  }

showVideos(){
  this.name=this.route.snapshot.paramMap.get('name');
 // console.log(this.name)
  this.adminservice.getTeacherVideo(this.name).subscribe(res=>{
  this.video=res as Video[]
  //console.log(res)
  })
}
getUser(){
this.userService.getUserProfile().subscribe(res => {
  this.userDetails = res['user'];
 console.log( this.userDetails._id)
})
}
likeVideo(_id:string,userId:string){
 
  this.videoService.likevideo(_id,userId).subscribe(res=>{
 //  console.log(this.getUser());
    console.log('Liked')
  })
}

dislikeVideo(_id:string,userId:string){
  this.videoService.dislikevideo(_id,userId).subscribe(res=>{
    console.log('DisLiked')
  })
}

commentvideo(_id:string,userId:string,comment:string){
  this.videoService.postcomment(_id,userId,comment).subscribe(res=>{

    console.log('Commented')
  })
 }
}
