import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../main.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-mysessions',
  templateUrl: './mysessions.component.html',
  styleUrls: ['./mysessions.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MysessionsComponent implements OnInit {

  constructor(private service: MainService, public router: Router) { }
  public sessionLists = [];
  public currentDate = new Date();

  ngOnInit() {
    this.getMySessions();

  }

  getMySessions() {
    let userId = localStorage.getItem("userId");
    this.service.getMySessionList(userId).subscribe(res => {
      this.sessionLists = res.response.result;
      console.log("this.sessionLists", res.response.result);
    }, (error) => {
      //Error callback
    });
  }

}
