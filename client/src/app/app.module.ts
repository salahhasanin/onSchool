import { ContactUSComponent } from './style/contact-us/contact-us.component';
import { AdminService } from './shared/admin.service';
import { RoleGuard } from './auth/role.guard';
import { AuthGuard } from './auth/auth.guard';
import { SignUpComponent } from './sign-up/sign-up.component';
import { appRoutes } from './routes';
import { RouterModule } from '@angular/router';
import { UserService } from './shared/user.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '../../node_modules/@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';

import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './style/navbar/navbar.component';
import { AdminVideoComponent } from './admin-panel/admin-video/admin-video.component';
import { CategoryComponent } from './home/category/category.component';
import { TeachersComponent } from './home/teachers/teachers.component';
import { TeachervideoComponent } from './home/teachervideo/teachervideo.component';
import { SafePipe } from './shared/safe.pipe';
import { AboutUSComponent } from './style/about-us/about-us.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignUpComponent,
    UserProfileComponent,
    SignInComponent,
    AdminPanelComponent,
    HomeComponent,
    NavbarComponent,
    AdminVideoComponent,
    CategoryComponent,
    TeachersComponent,
    TeachervideoComponent,
    SafePipe,
    ContactUSComponent,
    AboutUSComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [{provide: HTTP_INTERCEPTORS,useClass: AuthInterceptor,multi: true},
    UserService,
    AdminService,
    AuthGuard,
    RoleGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
