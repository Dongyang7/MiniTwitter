import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';


import { AppComponent } from './app.component';
import { RegisterationComponent } from './auth/registeration/registeration.component';
import { LoginComponent } from './auth/login/login.component';
// import { PostsComponent } from './posts/posts/posts.component';
// import { DetailsComponent } from './posts/details/details.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { HomeComponent } from './layout/home/home.component';
import { registerLocaleData } from '@angular/common';

import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { CookieService } from 'ngx-cookie-service';
import { InterceptorService } from './auth/interceptor.service';
// import { CreatepostComponent } from './posts/createpost/createpost.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterationComponent,
    LoginComponent,
    // PostsComponent,
    // DetailsComponent,
    NavigationComponent,
    HomeComponent,
    // CreatepostComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path:'home',component:HomeComponent,canActivate:[AuthGuard]},
      {path:'login',component:LoginComponent},
      {path:'registeration',component:RegisterationComponent},
      {path:'posts',loadChildren:'app/posts/posts/posts.module#PostsModule',canActivate:[AuthGuard]},
      {path:'',redirectTo:'home',pathMatch:'full'},
      {path:'**',redirectTo:'home'}
    ])
  ],
  providers: [AuthService, AuthGuard, CookieService, {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
