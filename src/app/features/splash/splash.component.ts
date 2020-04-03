import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit, OnDestroy {

  timeoutInstance = null;

  constructor(public router: Router) { }

  ngOnInit() {
    this.timeoutInstance = setInterval(() => {
      this.router.navigate(['/auth/login']);
    }, 2000);
  }
  ngOnDestroy(){
    if(this.timeoutInstance){
      clearInterval(this.timeoutInstance)
    }
  }
  
}
