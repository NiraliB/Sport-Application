import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { TestEntryVM } from "./TestEntry.module";
import { Observable } from "rxjs";
import { TestTypeVM } from "./TestType.module";


@Injectable()
export class NewTestService {

  constructor(private _http: HttpClient) { }

  private httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  public GetAllTestEntryList(): Observable<TestEntryVM[]> {
    return this._http.get<TestEntryVM[]>('/api/NewTest/GetAllTestEntryData');
  }

  public GetTestTypes(): Observable<TestTypeVM[]> {
    return this._http.get<TestTypeVM[]>('/api/NewTest/GetAllTestTypesList');
  }

  public SaveTestEntryDetail(objTestData) {
    let body = JSON.stringify(objTestData);
    return this._http.post('/api/NewTest/SaveTestData', body, this.httpOption);
  }

  public EditTestEntryData(editTestId): Observable<TestEntryVM[]> {
    return this._http.get<TestEntryVM[]>('api/NewTest/GetEditTestEntry?testId=' + editTestId, this.httpOption);
  }

  public DeleteTestEntryAllData(testId) {
    return this._http.post('api/NewTest/DeleteTestEntryData?testId=' + testId, this.httpOption);
  }
  

}

