import { Injectable } from '@angular/core';
import {
  HttpClientModule,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { DataStorageService } from '../shared/data-storage.service';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private httpClient: HttpClient, private router: Router) {}

  signUp(email: string, password: string) {
    return this.httpClient
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAPgXYunECRWPaljeC22onRrvznrIeCHwE',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  signIn(email: string, password: string) {
    return this.httpClient
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAPgXYunECRWPaljeC22onRrvznrIeCHwE',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  signingOff() {
    this.user.next(null);
    this.router.navigate(['auth', 'signin']);
    localStorage.removeItem('token');

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }

    this.tokenExpirationTimer = null;
  }

  autoLogIn() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate;
    } = JSON.parse(localStorage.getItem('token'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLoggedOut(expirationDuration);
    }

  }

  autoLoggedOut(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.signingOff();
    }, expirationDuration);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLoggedOut(expiresIn * 1000);
    localStorage.setItem('token', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';

    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }

    switch (errorRes.error.error.message) {
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email exists already';
        break;

      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid Password';
        break;

      case 'USER_DISABLED':
        errorMessage = 'User Disable for some reason';
        break;

      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;

      case 'MISSING_PASSWORD':
        errorMessage = 'Missing Password';
        break;

      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'Operation Not Allowed';
        break;

      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage = 'Too Many Attempts Try Again Later';
        break;

      default:
        break;
    }
    return throwError(errorMessage);
  }
}
