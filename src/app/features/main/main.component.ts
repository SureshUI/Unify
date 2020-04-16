import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackgroundService } from './background.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public bgSource = './assets/images/bg4.png';
  constructor(public router: Router, public bgService: BackgroundService) { }

  ngOnInit() {
    this.bgService.bgsource$.subscribe(
      bgpath => {
        this.bgSource = bgpath;
      }
    )
  }

  logout() {
    localStorage.clear();
    this.router.navigate(["/auth/login"]);
  }

}
