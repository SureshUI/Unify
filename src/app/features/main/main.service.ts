import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppConfig } from '../config/app.config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  public apiURL;
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8",
      "Authorization": "Bearer " + localStorage.getItem("token")
    })
  };
  constructor(private http: HttpClient) {
    this.apiURL = AppConfig.urls.base;
  }
  public getProfileDetails(id): Observable<any> {
    return this.http.get(this.apiURL + '/user/profile/' + id + '/', this.httpOptions).pipe(
      map((response) => {
        return response;
      })
    );
  }
  public getAllUsers(): Observable<any> {
    return this.http.get(this.apiURL + '/user/', this.httpOptions).pipe(
      map((response) => {
        return response;
      })
    );
  }
  public saveSession(data): Observable<any> {
    return this.http
      .post(this.apiURL + "/sessions/create", data, this.httpOptions)
      .pipe(
        map(res => {
          return JSON.stringify(res);
        })
      )
  }
  public getMySessionList(id): Observable<any> {
    return this.http.get(this.apiURL + '/sessions/sessionlist/' + id, this.httpOptions).pipe(
      map((response) => {
        return response;
      })
    );
  }

}
