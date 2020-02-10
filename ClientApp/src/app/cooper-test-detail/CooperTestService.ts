import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { MapCooperVM } from './MapCooperVM.module';
import { Injectable } from '@angular/core';
import { UserEntryVM } from './UserEntryVM';

@Injectable()
export class CooperDetailService {

  constructor(private _http: HttpClient) { }

  private httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  public GetCooperTestDetails(testId): Observable<MapCooperVM[]> {
    return this._http.get<MapCooperVM[]>('api/CooperTest/GetAthleteDetailByTID?getTestId=' + testId, this.httpOption);
  }

  public GetAthleteListDDL(): Observable<UserEntryVM[]> {
    return this._http.get<UserEntryVM[]>('api/CooperTest/GetAthleteNameList');
  }

  public SaveAthleteDetails(objMapData) {
    let body = JSON.stringify(objMapData);
    return this._http.post('/api/CooperTest/SaveAthleteData', body, this.httpOption);
  }

  public EditAthleteDetailByMapId(editMapId): Observable<MapCooperVM[]> {
    return this._http.get<MapCooperVM[]>('api/CooperTest/GetEditAthleteDetails?mapId=' + editMapId, this.httpOption);
  }

  public DeleteAthleteData(delMapId) {
    return this._http.post('api/CooperTest/DeleteAthleteByMapId?mapId=' + delMapId, this.httpOption);
  }


}
