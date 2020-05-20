import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private cookieService: CookieService) {}

  setCookie(name: string, value: string) {
    this.cookieService.set(
      name, // name
      value, // value
      30, // 30 days
      '/', // base path
      'localhost', // please change the domain name while deploying on prod server 'visa2fly.com'
      false // secure or not. And also change the
    );
  }

  getCookie(name: string) {
    return this.cookieService.get(name);
  }
}
