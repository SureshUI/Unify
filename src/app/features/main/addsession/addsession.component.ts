import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MainService } from '../main.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';


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
  public participantsLisPageFlag = false;
  //public participantsList = [];
  public profileDetails: any;
  toppings = new FormControl();
  pipe = new DatePipe('en-US');
  now = Date.now();
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
    this.participantsLisPageFlag = false;
  }
  public dateDiff;
  getPreviewPage() {
    this.createSessionFlag = false;
    this.previewPageFlag = true;
    this.datetimeFlag = false;
    this.loadTrackFlag = false;
    this.participantsLisPageFlag = false;
    console.log("sessionModel", this.sessionModel);

  }

  closeCalender() {
    this.createSessionFlag = true;
    this.previewPageFlag = false;
    this.datetimeFlag = false;
    this.loadTrackFlag = false;
    this.participantsLisPageFlag = false;
  }

  getLoadTrackPage() {
    this.createSessionFlag = false;
    this.previewPageFlag = false;
    this.datetimeFlag = false;
    this.loadTrackFlag = true;
    this.participantsLisPageFlag = false;
  }

  getparticipantsLisPage() {
    this.createSessionFlag = false;
    this.previewPageFlag = false;
    this.datetimeFlag = false;
    this.loadTrackFlag = false;
    this.participantsLisPageFlag = true;
    this.getAllUsers();
  }
  getProfileDetails() {

    var user_id = localStorage.getItem("userId");
    this.service.getProfileDetails(user_id).subscribe(res => {
      this.profileDetails = res;
    }, (error) => {
      //Error callback
    });
  }

  getAllUsers() {
    this.service.getAllUsers().subscribe(res => {
      this.participantList = res.results;
    }, (error) => {
      //Error callback
    });
  }

  saveSession() {

    var req = this.sessionModel;
    req["hosted_by"] = this.profileDetails.id;
    req["session_code"] = "";
    req["start_endtime"] = "";
    req["session_logo_url"] = "";
    req["file_url"] = "";
    req["Is_let_participants_file"] = false;
    req["Is_public"] = this.sessionModel["Is_public"] ? true : false;
    req["Is_autostart"] = this.sessionModel["Is_autostart"] ? true : false;
    let mySimpleFormat = this.pipe.transform(req["start_datetime"], 'yyyy-MM-dd HH:mm:ss');

    req["start_datetime"] = mySimpleFormat;
    req["start_endtime"] = mySimpleFormat;
    this.service.saveSession(req).subscribe(res => {
      this.router.navigate(["/main/mysessions"]);
    }, (error) => {
      //Error callback
    });
  }

}
