import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { MainService } from '../main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addsession',
  templateUrl: './addsession.component.html',
  styleUrls: ['./addsession.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddsessionComponent implements OnInit {
  public participantList = [];
  public sessionModel = {};
  public createSessionFlag = false;
  public previewPageFlag = false;
  public datetimeFlag = false;
  public loadTrackFlag = false;
  public participantsList = [];

  toppings = new FormControl();
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  constructor(private service: MainService, public router: Router) { }

  ngOnInit() {
    this.getProfileDetails();
    this.createSessionFlag = true;
  }

  getCalender() {
    this.createSessionFlag = false;
    this.previewPageFlag = false;
    this.datetimeFlag = true;
    this.loadTrackFlag = false;
  }

  getPreviewPage() {
    this.createSessionFlag = false;
    this.previewPageFlag = true;
    this.datetimeFlag = false;
    this.loadTrackFlag = false;
  }

  closeCalender() {
    this.createSessionFlag = true;
    this.previewPageFlag = false;
    this.datetimeFlag = false;
    this.loadTrackFlag = false;
  }

  getLoadTrackPage() {
    this.createSessionFlag = false;
    this.previewPageFlag = false;
    this.datetimeFlag = false;
    this.loadTrackFlag = true;
  }
  getProfileDetails() {
    var user_id = localStorage.getItem("userId");
    this.service.getProfileDetails(user_id).subscribe(result => {
      let res = JSON.parse(result);
      console.log("Profile details", res);
    }, (error) => {
      //Error callback
    });
  }

  getAllUsers() {
    this.service.getAllUsers().subscribe(result => {
      let res = JSON.parse(result);
      this.participantList = res.results;
      console.log("Profile details", this.participantList);
    }, (error) => {
      //Error callback
    });
  }

}
