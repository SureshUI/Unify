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
  ngOnInit() {
  }

  signIn(model) {
    console.log("model", model);
    this.service.signIn(model).subscribe(res => {
      console.log("res", res);
      if (res) {
        this.router.navigate(["/auth/login"]);
      }
    }, (error) => {
      this.errorMsg = true;                           //Error callback
      // console.error('error caught in component', error.error)

    })
  }

}
