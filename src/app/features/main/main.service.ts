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

  httpOptionsImg = {
    headers: new HttpHeaders({
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

  public getMynextSession(id): Observable<any> {
    return this.http.get(this.apiURL + '/sessions/getnextsession/' + id, this.httpOptions).pipe(
      map((response) => {
        return response;
      })
    );
  }

  public getSessionDetails(sessionId, userId): Observable<any> {
    return this.http.get(this.apiURL + '/sessions/viewsession/' + sessionId + '/' + userId, this.httpOptions).pipe(
      map((response) => {
        return response;
      })
    );
  }


  public getProfileData(userId): Observable<any> {
    return this.http.get(this.apiURL + '/userprofile/' + userId, this.httpOptions).pipe(
      map((response) => {
        return response;
      })
    )
  }

  public updateProfile(profile_id, data): Observable<any> {
    return this.http
      .put(this.apiURL + "/userprofile/update/" + profile_id, data, this.httpOptions)
      .pipe(
        map(res => {
          return JSON.stringify(res);
        })
      )
  }

  public uploadProfileImage(formData): Observable<any> {

    return this.http
      .post(this.apiURL + "/userprofile/profileimageupload", formData, this.httpOptionsImg)
      .pipe(
        map(res => {
          return JSON.stringify(res);
        })
      );
  }

}
