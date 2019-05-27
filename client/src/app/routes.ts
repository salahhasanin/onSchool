import { AboutUSComponent } from './style/about-us/about-us.component';
import { ContactUSComponent } from './style/contact-us/contact-us.component';
import { TeachervideoComponent } from './home/teachervideo/teachervideo.component';
import { CategoryComponent } from './home/category/category.component';
import { AdminVideoComponent } from './admin-panel/admin-video/admin-video.component';
import { RoleGuard } from './auth/role.guard';
import { HomeComponent } from './home/home.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AuthGuard } from './auth/auth.guard';
import { SignUpComponent } from './sign-up/sign-up.component';
import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TeachersComponent } from './home/teachers/teachers.component';


export const appRoutes: Routes = [
    {
        path: 'signup', component: UserComponent,
        children: [{ path: '', component: SignUpComponent }]
    },
    {
        path: 'login', component: UserComponent,
        children: [{ path: '', component: SignInComponent }]
    },
    { path: 'userprofile',component: UserProfileComponent,canActivate:[AuthGuard] },
    { path: 'adminpanel',component: AdminPanelComponent,canActivate:[AuthGuard,RoleGuard] },
    { path: 'adminvideo',component: AdminVideoComponent,canActivate:[AuthGuard,RoleGuard] },
    { path: 'home',component: HomeComponent },
    { path: 'contact',component: ContactUSComponent },
    { path: 'about',component: AboutUSComponent },
    { path: 'category',component: CategoryComponent,canActivate:[AuthGuard] },
    { path: 'teacher/:name',component: TeachersComponent,canActivate:[AuthGuard] },
    { path: 'teachervideo/:name',component: TeachervideoComponent,canActivate:[AuthGuard] },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];