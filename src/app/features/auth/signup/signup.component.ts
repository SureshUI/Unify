import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public errorMsg = false;
  constructor(private service: AuthService, public router: Router) { }
  public userModel = {};
  public showpwd = false;
  public showconpwd = false;
  ngOnInit() {
  }

  signIn(model) {
    let req = {};
    req = model;
    req["phone_number"] = "";
    req["photo_base_64"] = "";
    req["is_deleted"] = false;
    req["is_active"] = true;
    req["dob"] = new Date();
    req["gender"] = "";
    req["uname"] = model["username"]

    this.service.signInUser(model).subscribe(res => {

      if (res) {
        this.router.navigate(["/auth/login"]);
      }
    }, (error) => {
      this.errorMsg = true;                           //Error callback
      // console.error('error caught in component', error.error)

    })
  }

}
