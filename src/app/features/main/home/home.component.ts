import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../main.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  constructor(public router: Router, private service: MainService) { }
  public profileDetails: any;
  ngOnInit() {
    this.getProfileDetails();
  }
  getProfileDetails() {
    var user_id = localStorage.getItem("userId");
    this.service.getProfileDetails(user_id).subscribe(res => {
      this.profileDetails = res;
    }, (error) => {
      //Error callback
    });
  }
  logout() {
    localStorage.clear();
    this.router.navigate(["/auth/login"]);
  }
}
