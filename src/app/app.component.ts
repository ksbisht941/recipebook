import { Component, OnInit } from '@angular/core';
import { LoaderService } from './loader/loader.service';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Angular';
  public showPreloader: boolean = false;

  onAddItem(form) {}

  constructor(private loaderService: LoaderService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loaderService.getAlert().subscribe((showPreloader: boolean) => {
      this.showPreloader = showPreloader;
    });

    this.authService.autoLogIn();
  }
}
