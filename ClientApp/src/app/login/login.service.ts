import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";


@Injectable()
export class LoginService {

  constructor(private _http: HttpClient) { }

  private httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  public GetLogin(userObj) {
    let body = JSON.stringify(userObj);
    return this._http.post('api/Login/GetUserLogin', body, this.httpOption);
  }


}
