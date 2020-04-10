import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MainService } from '../main.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';


@Component({
  selector: 'app-addsession',
  templateUrl: './addsession.component.html',
  styleUrls: ['./addsession.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [DatePipe]
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
  public minDate;
  public errorMsg = false;
  // toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  public currentDate: any;
  constructor(private service: MainService, public router: Router, private datePipe: DatePipe) {
    this.currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.minDate = this.currentDate;
  }

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
    // console.log("sessionModel", this.sessionModel);
    var start_datetime = moment(this.datePipe.transform(this.sessionModel["start_datetime"], 'yyyy-MM-dd'));
    var curDate = moment(this.currentDate);

    var days = Math.abs(start_datetime.diff(curDate, 'days'));
    this.sessionModel["days"] = days;

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
    var user_id = localStorage.getItem("userId");
    var participantListIds = [];
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
    var len = this.sessionModel["participants"].length
    req["participants"][len] = Number(user_id);

    this.service.saveSession(req).subscribe(result => {
      var res = JSON.parse(result);
      console.log(res);
      if (res && res.Resp && res.Resp.status) {
        this.errorMsg = true;
      } else {
        this.router.navigate(["/main/mysessions"]);
      }
    }, (error) => {
      //Error callback
    });
  }

}
