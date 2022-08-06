// import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
// import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
// import { BehaviorSubject, catchError, Observable, Subject, tap, throwError } from "rxjs";
// import { environment } from "src/environments/environment";
import { User } from "./user";
import * as fromApp from './../store/app.reducer';
import * as AuthActions from './store/auth.actions';

// export interface AuthResponseData {
//     displayName: string | null,
//     email: string,
//     expiresIn: string,
//     idToken: string,
//     kind: string,
//     localId: string,
//     refreshToken: string,
//     registered: boolean | null
// }

@Injectable({ providedIn: 'root' })
export class AuthService {

    // user = new BehaviorSubject<User | null>(null);
    tokenExpirationTimer!: any;

    // private apiKey: string = environment.apiKey;

    constructor(
        // private httpClient: HttpClient,
        // private router: Router,
        private store: Store<fromApp.AppState>
    ) { }

    setLogoutTimer(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.store.dispatch(new AuthActions.Logout());
        }, expirationDuration);
    }

    clearLogoutTimer() {
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
            this.tokenExpirationTimer = null; 
        }
    }

    // signup(email: string, password: string): Observable<AuthResponseData> {
    //     return this.httpClient.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`, {
    //         email, password, returnSecureToken: true
    //     }).pipe(
    //         catchError(this.handleError),
    //         tap(((response) => {
    //             this.handleAuthentication(response.email, response.localId, response.idToken, +response.expiresIn)
    //         }))
    //     );
    // }

    // login(email: any, password: any): Observable<AuthResponseData> {
    //     return this.httpClient.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`, {
    //         email, password, returnSecureToken: true
    //     }).pipe(
    //         catchError(this.handleError),
    //         tap(((response) => {
    //             this.handleAuthentication(response.email, response.localId, response.idToken, +response.expiresIn)
    //         }))
    //     );
    // }

    // logout() {
    //     // this.user.next(null);
    //     this.store.dispatch(new AuthActions.Logout())
    //     localStorage.removeItem('userData');
    //     if (this.tokenExpiratiuonTimer) {
    //         clearTimeout(this.tokenExpiratiuonTimer)
    //     }

    //     this.tokenExpiratiuonTimer = null;
    // }

    // private handleAuthentication(
    //     email: string,
    //     userId: string,
    //     token: string,
    //     expiresIn: number
    // ) {

    //     const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    //     // this.user.next(user);
    //     const user = new User(email, userId, token, expirationDate);
    //     this.store.dispatch(new AuthActions.AuthenticateSuccess({
    //         email: email,
    //         expirationDate: expirationDate,
    //         token: token,
    //         userId: userId
    //     }))
    //     this.autoLogout(expiresIn * 1000);
    //     localStorage.setItem('userData', JSON.stringify(user));
    // }

    // private handleError(errorRes: HttpErrorResponse) {
    //     let errorMessage = 'An unknown error occured!';
    //     if (!errorRes.error || !errorRes.error.error) {
    //         return throwError(() => errorMessage);
    //     }

    //     switch (errorRes.error.error.message) {
    //         case 'EMAIL_EXISTS':
    //             errorMessage = 'This email exists aleardy';
    //             break;

    //         case 'OPERATION_NOT_ALLOWED':
    //             errorMessage = 'Operation not allowed';
    //             break;

    //         case 'TOO_MANY_ATTEMPTS_TRY_LATER':
    //             errorMessage = 'Too many attempts try later';
    //             break;

    //         case 'EMAIL_NOT_FOUND':
    //             errorMessage = 'Email not found';
    //             break;

    //         case 'INVALID_PASSWORD':
    //             errorMessage = 'Invalid password';
    //             break;

    //         case 'USER_DISABLED':
    //             errorMessage = 'User disabled';
    //             break;
    //     }

    //     return throwError(() => errorMessage);
    // }

    // autoLogin() {
    //     let userData: {
    //         email: string,
    //         id: string,
    //         _token: string,
    //         _tokenExpirationDate: Date
    //     } | null = null;
    //     let fetchedUserData = localStorage.getItem('userData');
    //     if (fetchedUserData) userData = JSON.parse(fetchedUserData);
    //     if (!userData) return;

    //     const loadedUser = new User(
    //         userData.email,
    //         userData.id,
    //         userData._token,
    //         new Date(userData._tokenExpirationDate)
    //     )

    //     if (loadedUser.token) {
    //         // this.user.next(loadedUser);
    //         this.store.dispatch(new AuthActions.AuthenticateSuccess({
    //             email: loadedUser.email,
    //             userId: loadedUser.email,
    //             token: loadedUser.token,
    //             expirationDate: new Date(userData._tokenExpirationDate)
    //         }))
    //         const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
    //         this.autoLogout(expirationDuration);
    //     }
    // }

    // autoLogout(expiration: number) {
    //     this.tokenExpiratiuonTimer = setTimeout(() => {
    //         this.logout();
    //     }, expiration);
    // }
}