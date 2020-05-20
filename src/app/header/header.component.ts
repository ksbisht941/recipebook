import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { LoaderService } from '../loader/loader.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  private userSub: Subscription;
  isAuthenticated: boolean;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private loaderService: LoaderService,
    private toastr: ToastrService
  ) {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }

  ngOnInit(): void {}

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onSigningOff() {
    this.loaderService.showPreloader(true);
    this.authService.signingOff();
    this.popOnAction();
    this.toastr.success("You're Logged Out")
  }

  popOnAction() {
    let audio = new Audio();
    audio.src = '../../../assets/pop.mp3';
    audio.load();
    audio.play();
  }
}
