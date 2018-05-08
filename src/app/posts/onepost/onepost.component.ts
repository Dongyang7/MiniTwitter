import { Component, OnInit, Input } from '@angular/core';
import { PostService } from '../post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onepost',
  templateUrl: './onepost.component.html',
  styleUrls: ['./onepost.component.css']
})
export class OnepostComponent implements OnInit {

  @Input() post: any={};
  editing: boolean=false;
  comments: any=false;
  newcomment: string='';
  likedusers: any=[];
  likenumber: number;
  showliked: boolean=false;
  constructor(private _postService: PostService, private _router: Router) { }

  ngOnInit() {
    this._postService.showcommentFn(this.post._id).subscribe((data:any={})=>{
      this.post = data.data;
      console.log(data);
      if (this.post) {
        this.likenumber = data.data.like.length;
        this.likedusers = data.data.like;
      }
    })
  }

  showcomments(postId) {
    // this._postService.showcommentFn(postId).subscribe((data:any={})=>{
    //   this.comments = data.data.comments;
    // })
    this._postService.showcommentFn(this.post._id).subscribe((data:any={})=>{
      this.comments = data.data.comments;
    })
  }
  addcomment(pId) {
    this._postService.addcommentFn(pId, this.newcomment).subscribe((data:any={})=>{
      console.log(data);
      this.comments = data.data.comments;
    })
  }
  like(pId) {
    this._postService.likeFn(pId).subscribe((data:any={})=>{
      console.log(data);
      this.likenumber = data.data.like.length;
      this.likedusers = data.data.like;
    })
  }
  deletepost() {
    this._postService.deleteFn(this.post._id).subscribe((data:any={})=>{
      console.log(data);
      if (data.ok) this.ngOnInit();
    })
  }
  updatedFn(event) {
    this.editing = event;
  }
}
