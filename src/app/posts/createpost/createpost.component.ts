import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PostService } from '../post.service';

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css']
})
export class CreatepostComponent implements OnInit {

  @Input() post:any={};
  @Input() editing:any='';
  @Output() updated:EventEmitter<boolean> = new EventEmitter<boolean>();
  title: any='';
  // post:any={};
  constructor(private _postService:PostService) { }

  ngOnInit() {
    if (this.editing) this.title = 'Update Post';
    else this.title = 'Create Post';
  }
  createpost() {
    this._postService.createpostFn(this.post).subscribe((data:any={})=>{
      if (data.ok) alert('You have successfully posted it');
      else console.log(data);
    })
  }
  updatepost() {
    this._postService.updatepostFn(this.post).subscribe((data:any={})=>{
      if (data.ok) this.updated.emit(false);
      else console.log(data);
    })
  }
}
