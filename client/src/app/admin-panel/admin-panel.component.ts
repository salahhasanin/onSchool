import { NgForm } from '@angular/forms';
import { AdminService } from './../shared/admin.service';
import { UserDetails, UpdateUserDetails, TeacherDetails } from './../shared/user.model';
import { UserService } from './../shared/user.service';
import { Component, OnInit } from '@angular/core';
declare var M: any;

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  myData: any[] = [];
  constructor(private test:UserService,private adminservice:AdminService) { }

  ngOnInit() {
    this.test.getUserRole();
    this.onget();
    this.resetForm();
    this.ongetteacher();
    this.getCtegory();
  }

  onSubmit(form: NgForm) {
    if (form.value._id == "") {
      M.toast({ html: 'add to update', classes: 'rounded' });
      }
    
    else {
   //   this.adminservice.updateUser(form.value).subscribe((res) => {
        this.resetForm(form);
        this.onget();
      //  M.toast({ html: 'Updated successfully', classes: 'rounded' });
     // });
    }
  }

  onget(){
    this.adminservice.getuserslist().subscribe((res) => {
    this.adminservice.user = res as UserDetails[];
     //console.log(res);
  });
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.adminservice.selectedUpdateUserDetails = {
      _id: "",
      roles: "",
      access: [""],
    }
  }

  onEdit(/*user: UpdateUserDetails,*/_id: string,form: NgForm) {
    this.adminservice.updateUser(form.value , _id).subscribe((res) => {
      this.resetForm(form);
    });
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.adminservice.deleteUser(_id).subscribe((res) => {
        this.onget();
        this.resetForm(form);
      });
    }
  }

  getCtegory(){
    this.adminservice.getCategories().subscribe((res:any[])=>{
      this.myData=res;
      })
  }
  ongetteacher(){
    this.adminservice.getteacherlist().subscribe(res => {
     this.adminservice.teacher = res as TeacherDetails[];
      
  console.log(this.adminservice.teacher);
  });
  }

 addCategoryTeachers(_id: string,form: NgForm){
    this.adminservice.addCategory(form.value, _id).subscribe(res=>{
     // this.adminservice.teacher=res as 
     this.resetForm(form);
    })
  }
}
