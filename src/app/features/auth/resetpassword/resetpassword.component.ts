import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {

  constructor(private route: ActivatedRoute, private service: AuthService, public router: Router) { }
  public passwordModel = {
    password: "",
    confirmPassword: ""
  };
  ngOnInit() {
  }

  resetPassword() {
    let model = this.passwordModel;
    let request = {
      "token": this.route.snapshot.paramMap.get('token'),
      "password": model.password
    };
    this.service.confirm(request).subscribe(res => {
      if (res == "null") {
        alert("Password update successfully..!");
        this.router.navigate(["/auth/login"]);
      } else {
        alert("Error while updating password");
      }
    })
  }

}
