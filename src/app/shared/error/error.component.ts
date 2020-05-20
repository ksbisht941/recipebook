import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  redirectPage() {
    if (localStorage.getItem('token')) {
      this.router.navigate(['recipes']);
    } else {
      this.router.navigate(['auth', 'signup']);
    }
  }
}
