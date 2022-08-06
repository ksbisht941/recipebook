import { Component, OnInit } from '@angular/core';
import { Blog } from './blog';
import { BlogService } from './blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  blogs: Blog[] = [];

  constructor(
    private blogService: BlogService
  ) { 
    this.blogs = this.blogService.getBlogs();
  }

  ngOnInit(): void {
  }

}
