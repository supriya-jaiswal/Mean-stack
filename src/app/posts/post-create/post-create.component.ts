import { Component, OnInit} from '@angular/core';
import { Post } from '../post.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']

})

export class PostCreateComponent implements OnInit{
  newPost = "";
  enteredValue = "";
  enteredTitle = "";
  enteredContent = "";
  form : FormGroup;
  isLoading = false;
  private mode = 'create';x
  private postId : string;
  post : Post;


  constructor(public postsService : PostsService, public route: ActivatedRoute )
{}

ngOnInit(){
  this.form = new FormGroup({
    'title': new FormControl(null,{validators:[Validators.required, Validators.minLength(3)]}),
    'content': new FormControl(null,{validators:[Validators.required]})
  });
this.route.paramMap.subscribe((paramMap : ParamMap) =>{
  if(paramMap.has('postId')){
    this.mode = 'edit';
    this.postId = paramMap.get('postId');
    this.isLoading = true;
    this.postsService.getPost(this.postId).subscribe(postData => {
      this.isLoading = false;
      this.post = {id: postData._id, title: postData.title, content: postData.content};
      this.form.setValue({title: this.post.title, content: this.post.title});

    });
  } else{
    this.mode = 'create';
    this.postId ='null';
  }

})
}
  onAddPost(){
    if (this.form.invalid){
      return true;
    }
    this.isLoading = true;
    if(this.mode === "create") {
    this.postsService.addPost(this.form.value.id,this.form.value.title, this.form.value.content);
    }else{
      this.postsService.updatePost(
        this.postId,
        this.form.value.title,
        this.form.value.content
      )
    };
    this.form.reset();
  }


}
