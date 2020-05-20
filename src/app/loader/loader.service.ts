import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  public subject = new Subject<any>();

  constructor() {}

  getAlert(): Observable<any> {
    return this.subject.asObservable();
  }

  showPreloader(showPreloader: boolean) {
    let show = showPreloader;
    this.subject.next(show);
  }
}
