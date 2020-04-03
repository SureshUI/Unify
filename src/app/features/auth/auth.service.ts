import { Injectable } from '@angular/core';
import { AppConfig } from '../config/app.config';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, retry, catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public apiURL;
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8"
    })
  };
  constructor(private http: HttpClient) {
    this.apiURL = AppConfig.urls.base;
  }

  public login(data): Observable<any> {
    return this.http
      .post(this.apiURL + "/token", data, this.httpOptions)
      .pipe(
        map(res => {
          return JSON.stringify(res);
        })
      );
  }

  public check(data): Observable<any> {
    return this.http
      .post(this.apiURL + "/user/check/", data, this.httpOptions)
      .pipe(
        map(res => {
          return JSON.stringify(res);
        })
      );
  }
  public signIn(data): Observable<any> {
    return this.http
      .post(this.apiURL + "/user/create", data, this.httpOptions)
      .pipe(
        map(res => {
          return JSON.stringify(res);
        })
      );
  }

  public confirm(data): Observable<any> {
    return this.http
      .post(this.apiURL + "/user/confirm/", data, this.httpOptions)
      .pipe(
        map(res => {
          return JSON.stringify(res);
        })
      );
  }

  public resetPassword(data): Observable<any> {
    return this.http
      .post(this.apiURL + "/user/resetpasswordtoken/", data, this.httpOptions)
      .pipe(
        map(res => {

          return JSON.stringify(res);
        })
      )
  }

  handleError(error) {

    let errorMessage = {};
    if (error.error instanceof ErrorEvent) {
      // client-side error
      // errorMessage = `Error: ${error.error.message}`;
      errorMessage = {
        "errorMessage": error.error.message
      }
    } else {
      // server-side error
      //errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      errorMessage = {
        "errorCode": error.status,
        "errorMessage": error.error
      }
    }

    //window.alert(errorMessage);
    console.log("errorMessage", errorMessage);


    return (JSON.stringify(errorMessage));

  }
}
