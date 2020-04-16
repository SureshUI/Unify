import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../main.service';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [DatePipe]
})
export class HomeComponent implements OnInit {
  public currentDate: any;
  public sessionModel = {};
  constructor(public router: Router, private service: MainService, private datePipe: DatePipe) {
    this.currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }
  public profileDetails = {};
  ngOnInit() {
    this.getMynextSession();
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
  getMynextSession() {
    var user_id = localStorage.getItem("userId");
    this.service.getMynextSession(user_id).subscribe(res => {
      // let sessionModel = {};
      if (res.response.result.length != 0) {
        this.sessionModel = res.response.result[0];
        var start_endtime = moment(this.datePipe.transform(this.sessionModel["start_endtime"], 'yyyy-MM-dd'));
        var curDate = moment(this.currentDate);
        var days = Math.abs(start_endtime.diff(curDate, 'days'));
        this.sessionModel["days"] = days;

        var start_datetimeDuration = moment(this.datePipe.transform(this.sessionModel["start_datetime"], 'yyyy-MM-dd HH:mm:ss'));
        var endDateTIme = moment(this.datePipe.transform(this.sessionModel["start_endtime"], 'yyyy-MM-dd HH:mm:ss'));
        var duration = Math.abs(start_datetimeDuration.diff(endDateTIme, 'hours'));
        this.sessionModel["between_hours"] = duration;

        console.log("this.session", this.sessionModel);
      }

    }, (error) => {
      //Error callback
    });
  }
  logout() {
    localStorage.clear();
    this.router.navigate(["/auth/login"]);
  }

  viewSessionDetails(id) {
    this.router.navigate(["/main/viewsession/" + id]);
  }
}
