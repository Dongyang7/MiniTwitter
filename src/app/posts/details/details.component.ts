import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';

@Component({

  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {

  comments: any=false;
  newcomment: string='';
  likedusers: any=[];
  likenumber: number;
  showliked: boolean=false;
  post: any={};
  constructor(private _postService: PostService, 
    private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe((id)=>{
      this._postService.getdetailFn(id.postId).subscribe((data:any={})=>{
        if (data.ok) {
          this.post = data.data;
          this.likenumber = data.data.like.length;
          this.likedusers = data.data.like;
        }
        else console.log(data);
      })
    })
  }

  showcomments(postId) {
    // this._postService.showcommentFn(postId).subscribe((data:any={})=>{
    //   this.comments = data.data.comments;
    // })
    this.comments = this.post.comments;
  }
  addcomment(pId) {
    this._postService.addcommentFn(pId, this.newcomment).subscribe((data:any={})=>{
      console.log(data);
      this.comments = data.data.comments;
    })
  }
  like(pId) {
    this._postService.likeFn(pId).subscribe((data:any={})=>{
      this.likenumber = data.data.like.length;
      this.likedusers = data.data.like;
      console.log(data);
    })
  }
  deletepost() {
    this._postService.deleteFn(this.post._id).subscribe((data:any={})=>{
      console.log(data);
      if (data.ok) alert('Post deleted!');
    })
  }
}
