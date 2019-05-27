import { User } from './user.model';
import { Video, likevideo, dislikevideo } from './video.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
Video
@Injectable({
  providedIn: 'root'
})
export class VideoService {
selectvideo:Video;
video:Video[];

  constructor(private http:HttpClient,private router:Router) { }

  getvideolist(){
    return this.http.get('http://localhost:4000/video/getvideos');
   }

   getvideo(vid: Video){
    return this.http.get('http://localhost:4000/video/getvideo'+`/${vid._id}`);
   }

   postVideo(vid: Video) {
    return this.http.post('http://localhost:4000/video/addvideo', vid);
  }

  putVideo(vid: Video) {
    return this.http.put('http://localhost:4000/video/updatevideo' + `/${vid._id}`, vid);
  }

  deleteVideo(_id: string) {
    return this.http.delete('http://localhost:4000/video/deletevideo' + `/${_id}`);
  }

  likevideo(id,userId){
    const videoData = {id: id,userId: userId}
    //return this.http.put('http://localhost:4000/video/likevideo'+ `/${vidId}`+`/${UserId}`);
    return this.http.put('http://localhost:4000/video/likevideo',videoData);  
  }
  dislikevideo(id,userId){
    const videoData = {id: id,userId: userId}
    return this.http.put('http://localhost:4000/video/dislikevideo',videoData);
  }
  postcomment(id,comment,userId){
    const commentData = {id: id,userId: userId,comment: comment}
    return this.http.post('http://localhost:4000/video/addcomment', commentData);
  }
}
