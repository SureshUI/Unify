import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from '../main.service';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
@Component({
  selector: 'app-viewsession',
  templateUrl: './viewsession.component.html',
  styleUrls: ['./viewsession.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [DatePipe]

})
export class ViewsessionComponent implements OnInit {
  public sessionId;
  public session_details;
  public participants;
  public currentDate: any;
  constructor(private service: MainService, public router: Router, private route: ActivatedRoute, private datePipe: DatePipe) {
    this.currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  ngOnInit() {
    this.sessionId = this.route.snapshot.paramMap.get('sessionId');
    this.getSessionDetails();
  }
  back() {
    this.router.navigate(["/main/mysessions"]);
  }
  getSessionDetails() {
    var userId = localStorage.getItem("userId");
    this.service.getSessionDetails(this.sessionId, userId).subscribe(res => {
      // console.log("sessiondetails", res);
      if (res && res.Resp.status == "success") {
        this.participants = res.Resp.participants;
        this.session_details = res.Resp.session_details[0];
        console.log('session_details', this.session_details);

        var start_endtime = moment(this.datePipe.transform(this.session_details["start_endtime"], 'yyyy-MM-dd'));
        var curDate = moment(this.currentDate);
        var days = Math.abs(start_endtime.diff(curDate, 'days'));
        this.session_details["days"] = days;

        var start_datetimeDuration = moment(this.datePipe.transform(this.session_details["start_datetime"], 'yyyy-MM-dd HH:mm:ss'));
        var endDateTIme = moment(this.datePipe.transform(this.session_details["start_endtime"], 'yyyy-MM-dd HH:mm:ss'));
        var duration = Math.abs(start_datetimeDuration.diff(endDateTIme, 'hours'));
        this.session_details["between_hours"] = duration;
      }

    })
  }

}
