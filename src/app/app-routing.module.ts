import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { loginComponent } from './auth/login/login.component';
import { signupComponent } from './auth/signup/signup.component';


const routes: Routes = [
  {path: '', component: PostListComponent },
  {path: 'create', component: PostCreateComponent },
  {path: 'edit/:postId', component: PostCreateComponent },
  {path: 'login', component: loginComponent},
  {path: 'signup', component: signupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
