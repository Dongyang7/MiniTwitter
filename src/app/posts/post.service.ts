import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PostService {

  constructor(private _http: HttpClient) { }

  createpostFn(post) {
    return this._http.post('http://localhost:3000/addpost', post);
  }
  getPostFn() {
    return this._http.get('http://localhost:3000/getposts');
  }
  updatepostFn(post) {
    return this._http.post('http://localhost:3000/updatepost', post);
  }
  getdetailFn(postId) {
    return this._http.post('http://localhost:3000/getdetail', {postId: postId});
  }
  showcommentFn(postId) {
    return this._http.post('http://localhost:3000/getcomment', {postId: postId});
  }
  addcommentFn(pId, newcomment) {
    return this._http.post('http://localhost:3000/addcomment', {
      postId: pId, newcomment: newcomment
    });
  }
  likeFn(pId) {
    return this._http.post('http://localhost:3000/likepost', {pId: pId});
  }
  deleteFn(pId) {
    return this._http.post('http://localhost:3000/deletepost', {pId: pId});
  }
}
