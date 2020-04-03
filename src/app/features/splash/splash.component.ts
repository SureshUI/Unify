import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
    this.flashTimer();
  }

  flashTimer() {
    console.log("this.router.url", this.router.url);
    if (this.router.url === '/splash') {
      setInterval(() => {

        this.router.navigate(["/auth/login"]);

      }, 1000);
    }

  }

}
