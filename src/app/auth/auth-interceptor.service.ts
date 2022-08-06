import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, Observable, take } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from './user';
import * as fromApp from './../store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select('auth').pipe(
      take(1),
      map(authState => authState.user), 
      exhaustMap((user: User | null) => {
      if (!user) return next.handle(req); 
      const modifiedReq = req.clone({
        params: new HttpParams().set('auth', user?.token ? user?.token : '' )
      })
      return next.handle(modifiedReq);
    }));
  }
}
