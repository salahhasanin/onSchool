export class Video {
    _id:string;
    title: string;
    url: string; 
    description: string;
    createdBy:string;
  //  comment:string;
}

export class likevideo {
  likes:{};
  likedBy:{};
}

export class dislikevideo{
  dislikes:{};
  dislikedBy:{};
}

export class commentvideo{
  comments:[{}];
}