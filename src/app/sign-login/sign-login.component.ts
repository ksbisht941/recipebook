import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as $ from "jquery";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-login',
  templateUrl: './sign-login.component.html',
  styleUrls: ['./sign-login.component.css'],
})
export class SignLoginComponent implements OnInit {
  url: string;
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.params.subscribe((params: Params) => {
      console.log(params);
      
      if (params["form"] == "signin") {
        this.showSignIn();
      }
      if (params["form"] == "signup") {
        this.showSignUp();
      }
    });
  }

  ngOnInit(): void {
  }

  showSignUp() {
    $("#container").addClass('right-panel-active');
  }

  showSignIn() {
    $("#container").removeClass('right-panel-active');
  }

  navigateToSignIn() {
    this.router.navigate(["authentication", "signin"]);
  }
  navigateToSignup() {
    this.router.navigate(["authentication", "signup"]);
  }

  onSubmit(form: NgForm) {
    console.log(form);
    
  }
}
