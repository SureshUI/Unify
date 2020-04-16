import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../main.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public userId;
  public profileModel = {};
  uploadForm: FormGroup;
  constructor(public router: Router, private service: MainService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
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

  uploadprofilePictue(event) {
    let profile_id = localStorage.getItem("profile_id");
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('profile').setValue(file);
    }
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('profile').value);
    formData.append('profile_id', profile_id);
    this.service.uploadProfileImage(formData).subscribe(res => {
      if (res != null) {
        let result = JSON.parse(res);

      }
    });
  }
}
