import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Blog } from '../blog';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blog-full-page',
  templateUrl: './blog-full-page.component.html',
  styleUrls: ['./blog-full-page.component.scss']
})
export class BlogFullPageComponent implements OnInit {
  title!: string;
  content!: string;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const blog: Blog = this.blogService.getBlog(params['title']);
      this.title = blog?.title;
      this.content = blog?.content;
    })
  }

}
