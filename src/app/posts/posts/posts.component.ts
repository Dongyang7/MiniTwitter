import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts:any=[];
  newcomment: String='';
  comments:any=[];
  showornot:boolean=false;
  // showcomments: boolean=false;
  constructor(private _postService: PostService) { }

  ngOnInit() {
    this._postService.getPostFn().subscribe((data:any={})=>{
      if (data.ok) this.posts = data.data;
      else console.log(data);
    })
  }
}
