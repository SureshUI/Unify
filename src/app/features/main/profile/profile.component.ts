import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../main.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public userId;
  public profileModel = {};

  constructor(public router: Router, private service: MainService) { }

  ngOnInit() {
    this.userId = localStorage.getItem("userId");
    this.loadProfileData();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(["/auth/login"]);
  }

  loadProfileData() {
    this.service.getProfileData(this.userId).subscribe(res => {
      this.profileModel = res.Resp.result[0];
    });
  }

}
