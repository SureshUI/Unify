import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {
  public errorMsg = false;
  constructor(private service: AuthService, public router: Router) { }
  public email = '';
  ngOnInit() {
  }

  sendMail(email) {
    var request = {
      "email": email
    };
    // this.service.check(request).subscribe(res => {
    // if (res) {
    this.service.resetPassword(request).subscribe(res => {
      console.log("res sdfsd ", res);
      if (res == "null") {
        alert("Mail sent");
        this.router.navigate(["/auth/login"]);
      } else {
        alert("Invalid User");
      }
    }, (error) => {
      this.errorMsg = true;                           //Error callback
      // console.error('error caught in component', error.error)

    });
    // } else {
    //   alert("Invalid user");
    // }
    //})
  }

}
