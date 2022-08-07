import { animate, animateChild, group, query, stagger, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { blogAnimation, fade, slide } from '../animations/animations';
import { Blog } from './blog';
import { BlogService } from './blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  animations: [
    blogAnimation,

    trigger('blogsAnimation', [
      transition(':enter', [
        group([
          query('h1', [
            style({ transform: 'translateY(-20px)' }),
            animate(1000)
          ]),
          query('@blogAnimation', 
          stagger(200, animateChild()))
        ])
      ])
    ]),

    trigger('expandCollapse', [
      state('collapsed', style({
        height: 0,
        paddingTop: 0,
        paddingBottom: 0,
        opacity: 0
      })),
     
      // state('expanded', style({
      //   height: '*',
      //   overflow: 'auto'
      // })),

      transition('collapsed => expanded', [
        animate('300ms ease-out', style({
          height: '*',
          paddingTop: '*',
          paddingBottom: '*'
        })),
        animate('500ms', style({ opacity: 1 }))
      ]),
     
      transition('expanded => collapsed', [
        animate('300ms ease-in')
      ])
    ])
  ]
})
export class BlogComponent implements OnInit {

  blogs: Blog[] = [];
  isExpanded: boolean = false;

  constructor(
    private blogService: BlogService
  ) { 
    this.blogs = this.blogService.getBlogs();
  }

  ngOnInit(): void {
  }

  onDeleteBlog(idx: number) {
    this.blogs.splice(idx, 1);
  }

  onAddBlogs(event: any) {
    console.log(event);
    
    this.blogs.push({
      content: '',
      title: event.target.value
    });
  }

  animationStarted(event: any) {
    console.log(event);
    
  }

  animationDone(event: any) {
    console.log(event);
    
  }

  onToggleFaq() {
    this.isExpanded = !this.isExpanded;
  }
}
