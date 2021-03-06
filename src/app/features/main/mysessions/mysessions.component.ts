import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../main.service';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-mysessions',
  templateUrl: './mysessions.component.html',
  styleUrls: ['./mysessions.component.scss'],
  providers: [DatePipe]
})
export class MysessionsComponent implements OnInit {
  public sessionLists = [];
  public currentDate: any;
  constructor(private service: MainService, public router: Router, private datePipe: DatePipe) {
    this.currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }


  ngOnInit() {
    this.getMySessions();
    // this.currentDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');

  }

  getMySessions() {
    let userId = localStorage.getItem("userId");

    this.service.getMySessionList(userId).subscribe(res => {
      // this.sessionLists = res.response.result;
      for (var i = 0; i < res.response.result.length; i++) {
        // let sessionModel = {};
        let session = res.response.result[i];
        var start_endtime = moment(this.datePipe.transform(session["start_endtime"], 'yyyy-MM-dd'));
        var curDate = moment(this.currentDate);
        var days = Math.abs(start_endtime.diff(curDate, 'days'));
        session["days"] = days;

        var start_datetimeDuration = moment(this.datePipe.transform(session["start_datetime"], 'yyyy-MM-dd HH:mm:ss'));
        var endDateTIme = moment(this.datePipe.transform(session["start_endtime"], 'yyyy-MM-dd HH:mm:ss'));
        var duration = Math.abs(start_datetimeDuration.diff(endDateTIme, 'hours'));
        session["between_hours"] = duration;

        this.sessionLists.push(session);

      }
      console.log(this.sessionLists);
      // console.log("this.sessionLists", res.response.result);
    }, (error) => {
      //Error callback
    });
  }

  viewSessionDetails(id) {
    this.router.navigate(["/main/viewsession/" + id]);
  }

}
