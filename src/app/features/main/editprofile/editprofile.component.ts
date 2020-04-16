import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent implements OnInit {

  public userId;
  public profileModel = {};
  pipe = new DatePipe('en-US');
  public profile_id;
  editprofileForm: FormGroup;
  errorCondition;
  constructor(public router: Router, private service: MainService) {
    this.editprofileForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      'firstName': new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
      'lastName': new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
      'gender': new FormControl('', [Validators.required]),
      'dob': new FormControl('', [Validators.required]),
      'mobile': new FormControl('', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)])



    });

  }

  ngOnInit() {
    this.userId = localStorage.getItem("userId");
    this.profile_id = localStorage.getItem("profile_id");
    this.loadProfileData();
  }

  saveProfile() {
    let req = {};
    req = this.profileModel;
    let dob = this.pipe.transform(req["dob"], 'yyyy-MM-dd HH:mm:ss');
    req["dob"] = dob;
    req["photo_base_64"] = "";
    req["is_deleted"] = false;
    req["is_active"] = true;
    this.service.updateProfile(this.profile_id, req).subscribe(res => {
      this.router.navigate(["/main/profile"]);
    })
  }

  loadProfileData() {
    this.service.getProfileData(this.userId).subscribe(res => {

      this.profileModel = {
        first_name: res.Resp.result[0].first_name,
        last_name: res.Resp.result[0].last_name,
        email: res.Resp.result[0].email,
        phone_number: res.Resp.result[0].phone_number,
        gender: res.Resp.result[0].gender,
        dob: this.pipe.transform(res.Resp.result[0].dob, 'yyyy-MM-dd')
      }
      this.profile_id = res.Resp.result[0].profile_id;
    });
  }
}
