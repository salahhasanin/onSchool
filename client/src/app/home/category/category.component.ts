import { TeacherDetails } from './../../shared/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from './../../shared/admin.service';
import { UserService } from './../../shared/user.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  myData: any[] = [];
teachername:TeacherDetails[]


  constructor(private adminservice:AdminService,private router: Router,private userService:UserService) { }

  ngOnInit() {
    this.adminservice.getCategories().subscribe((res:any[])=>{
      this.myData=res;
      })
  
  }


  myEvent(event) {
    this.router.navigate(['/teacher',event.target.name])
  /*  this.adminservice.getTeacherCat(event.target.name).subscribe(res=>{
      this.teachername = res as TeacherDetails[];
      console.log(res);
    })*/
  //  console.log(event.target.name);
  }


}
