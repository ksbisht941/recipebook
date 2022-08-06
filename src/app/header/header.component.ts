import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Subscriber, Subscription, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage/data-storage.service';
import * as fromApp from './../store/app.reducer';
import * as AuthActions from './../auth/store/auth.actions';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub!: Subscription;
  isAuthenticate: boolean = false;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.userSub = this.store.select('auth').pipe(
      map(authState => authState.user)
    ).subscribe((user) => {
        this.isAuthenticate = !!user;
    });
  }

  ngOnDestroy(): void {
      if (this.userSub instanceof Subscriber) this.userSub.unsubscribe();
  }
  
  onSaveData() {
    this.dataStorageService.storeRecipes();
  }
  
  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  } 

  onLogout() {
    // this.authService.logout();
    this.store.dispatch(new AuthActions.Logout())
  }
}
