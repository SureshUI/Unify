import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginModel = {};
  constructor(private service: AuthService, public router: Router) { }
  public errorMsg = false;
  ngOnInit() {
  }

  login(model) {

    this.service.login(model).subscribe(result => {
      let res = JSON.parse(result);
      if (res.user_id) {
        localStorage.setItem("token", res.access);
        localStorage.setItem("userId", res.user_id);
        this.router.navigate(["/main/home"]);
      } else {

        this.errorMsg = true;
      }
    }, (error) => {
      this.errorMsg = true;                           //Error callback

    });
  }

}
