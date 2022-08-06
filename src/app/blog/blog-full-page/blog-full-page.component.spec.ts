import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogFullPageComponent } from './blog-full-page.component';

describe('BlogFullPageComponent', () => {
  let component: BlogFullPageComponent;
  let fixture: ComponentFixture<BlogFullPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogFullPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogFullPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
