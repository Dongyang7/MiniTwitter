import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';


import { PostsComponent } from '../../posts/posts/posts.component';
import { DetailsComponent } from '../../posts/details/details.component';
import { CreatepostComponent } from '../../posts/createpost/createpost.component';
import { OnepostComponent } from '../onepost/onepost.component';

import { PostService } from '../post.service';
import { InterceptorService } from '../../auth/interceptor.service';

@NgModule({
  declarations: [
    PostsComponent,
    DetailsComponent,
    CreatepostComponent,
    OnepostComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild([
      {path:'',component:PostsComponent},
      {path:'details/:postId',component:DetailsComponent},
      {path:'createpost',component:CreatepostComponent}
    ])
  ],
  providers: [PostService, {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }]
})
export class PostsModule { }
