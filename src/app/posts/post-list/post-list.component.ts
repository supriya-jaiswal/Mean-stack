import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']

})
export class PostListComponent implements OnInit, OnDestroy{
 posts: Post[] = [];
 isLoading = false;
 totalPosts = 10;
 postsPerPage = 2;
 currentPage =1;
 pageSizeOptions = [2,5,7,10];
 private postsSub: Subscription;
 constructor(public postsService: PostsService){}

 ngOnInit(){
   this.postsService.getPosts(this.postsPerPage,this.currentPage);
   this.isLoading = true;
  this.postsSub = this.postsService.getPostUpdateListener()
   .subscribe((posts: Post[]) => {
     this.isLoading = false;
     this.posts = posts;
   });
}

onChangedPage(pageData: PageEvent){
  this.isLoading = true;
  this.currentPage = pageData.pageIndex + 1;
  this.postsPerPage = pageData.pageSize;
  this.postsService.getPosts(this.postsPerPage, this.currentPage);

}

onDelete(postId: string){
  this.isLoading = true;
  this.postsService.deletePost(postId);
}
ngOnDestroy(){
  this.postsSub.unsubscribe();
}
}

