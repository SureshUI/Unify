import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackgroundService {
  public backgroundsource = new Subject<string>();
  bgsource$ = this.backgroundsource.asObservable();
  constructor() { }

  getPath(path: string) {
    this.backgroundsource.next(path);
  }

}
