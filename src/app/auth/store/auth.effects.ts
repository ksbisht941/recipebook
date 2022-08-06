import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthService } from "../auth.service";
import { User } from "../user";
import * as AuthActions from './auth.actions';

export interface AuthResponseData {
    displayName: string | null,
    email: string,
    expiresIn: string,
    idToken: string,
    kind: string,
    localId: string,
    refreshToken: string,
    registered: boolean | null
}

const handleAuthentication = (
    email: string,
    userId: string,
    token: string,
    expiresIn: number
) => {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    localStorage.setItem('userData', JSON.stringify(user));
    return new AuthActions.AuthenticateSuccess({
        email: email,
        userId: userId, 
        expirationDate: expirationDate,
        token: token
    });
}

const handleError = (errorRes: HttpErrorResponse) => {
    let errorMessage = 'An unknown error occured!';
    if (!errorRes.error || !errorRes.error.error) {
        return of(new AuthActions.AuthenticateFail(errorMessage));
    }

    switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
            errorMessage = 'This email exists aleardy';
            break;

        case 'OPERATION_NOT_ALLOWED':
            errorMessage = 'Operation not allowed';
            break;

        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
            errorMessage = 'Too many attempts try later';
            break;

        case 'EMAIL_NOT_FOUND':
            errorMessage = 'Email not found';
            break;

        case 'INVALID_PASSWORD':
            errorMessage = 'Invalid password';
            break;

        case 'USER_DISABLED':
            errorMessage = 'User disabled';
            break;
    }

    return of(new AuthActions.AuthenticateFail(errorMessage));
}

@Injectable()
export class AuthEffects {

    private apiKey: string = environment.apiKey;

    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {
            return this.httpClient
                .post<AuthResponseData>(
                    `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${this.apiKey}`,
                    {
                        email: authData.payload.email,
                        password: authData.payload.password,
                        returnSecureToken: true
                    }
                )
                .pipe(
                    map(resData => handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)),
                    catchError(errorRes => handleError(errorRes))
                );
        })
    );

    @Effect({ dispatch: false })
    authRedirect = this.actions$.pipe(
        ofType(AuthActions.AUTHENTICATE_SUCCESS, AuthActions.LOGOUT),
        tap((res) => {
            console.log(res);
            
            this.router.navigate(['/']);
        })
    );

    @Effect()
    authSignup = this.actions$.pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap((authData: AuthActions.SignupStart) => {
            return this.httpClient
                .post<AuthResponseData>(
                    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`,
                    {
                        email: authData.payload.email,
                        password: authData.payload.password,
                        returnSecureToken: true
                    }
                )
                .pipe(
                    tap((resData) => {
                        this.authService.setLogoutTimer(+resData.expiresIn * 1000);
                    }),
                    map(resData => handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)),
                    catchError(errorRes => handleError(errorRes))
                );
        })
    );

    @Effect({ dispatch: false })
    authLogout = this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => {
            localStorage.removeItem('userData');
        })
    )

    @Effect()
    authAutoLogin = this.actions$.pipe(
        ofType(AuthActions.AUTO_LOGIN), 
        map(() => {
            const userData: {
                email: string,
                id: string,
                _token: string,
                _tokenExpirationDate: Date
            } = JSON.parse(localStorage.getItem('userData'));

            if (!userData) return { type: 'DUMMY' };
    
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.authService.setLogoutTimer(expirationDuration);
            const loadedUser = new User(
                userData.email,
                userData.id,
                userData._token,
                new Date(userData._tokenExpirationDate)
            )
    
            if (loadedUser.token) {
                // this.user.next(loadedUser);
                
                return new AuthActions.AuthenticateSuccess({
                    email: loadedUser.email,
                    userId: loadedUser.id,
                    token: loadedUser.token,
                    expirationDate: new Date(userData._tokenExpirationDate)
                  });

                // const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
                // this.autoLogout(expirationDuration);
            }

            return { type: 'DUMMY' };
        })
    )

    constructor(
        private actions$: Actions,
        private httpClient: HttpClient,
        private router: Router,
        private authService: AuthService
    ) { }
}