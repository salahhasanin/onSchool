export class User {
    fullName: string;
    email: string; 
    password: string;
   // roles:string;
   
}

export class UserDetails {
    _id:string;
    fullName: string;
    email: string; 
    password: string;
    roles:string;
    access:[string];
}


export class TeacherDetails {
    _id:string;
    fullName: string;
    email: string; 
    password: string;
    roles:string;
    category:string
}

export class UpdateUserDetails {
    _id:string;
    roles:string;
    access:[string];
}