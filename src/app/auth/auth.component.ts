import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoaderService } from '../loader/loader.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLoginMode: boolean = true;
  url: any;
  hidePassword: boolean;
  

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router, 
    private loaderService: LoaderService
  ) {
    this.loaderService.showPreloader(false);
    this.activatedRoute.params.subscribe((params: Params) => {
      this.url = params['form'];
      if (this.url == 'signin') {
        this.showSignIn();
      } else if (this.url == 'signup') {
        this.showSignUp();
      }
    });
  }

  showPassword() {
    return (this.hidePassword = !this.hidePassword);
  }

  ngOnInit(): void {}

  showSignIn() {
    this.isLoginMode = true;
  }

  showSignUp() {
    this.isLoginMode = false;
  }

  switchMode() {
    if (this.url == 'signup') {
      this.router.navigate(['auth', 'signin']);
    } else if (this.url == 'signin') {
      this.router.navigate(['auth', 'signup']);
    }
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    if (this.url == 'signin') {
      authObs = this.authService.signIn(email, password);
    } else if (this.url == 'signup') {
      authObs = this.authService.signUp(email, password);
    }
    
    authObs.subscribe(
      (resData) => {
        
        if (this.url == 'signin') {
          this.toastr.success("You're Logged In");
        } else if (this.url == 'signup') {
          this.toastr.success("Congraturations!");
        }
        this.popOnAction();
        this.router.navigate(['recipes']);
        this.loaderService.showPreloader(true);
      },
      (errorMessage) => {
        this.toastr.error(errorMessage);
        this.popOnAction();
      }
    );
  }

  popOnAction() {
    let audio = new Audio();
    audio.src = '../../../assets/pop.mp3';
    audio.load();
    audio.play();
  }
 
}
