import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { TestEntryVM } from './TestEntry.module';
import { NewTestService } from './NewTest.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-new-test',
  templateUrl: './new-test.component.html',
  styleUrls: ['./new-test.component.css'],
  providers: [NewTestService]
})

export class NewTestComponent implements OnInit {

  model: NgbDateStruct;
  date: { year: number, month: number };

  dispText: string = "You can add or show created Tests";
  showModal: boolean;
  dtOptions: DataTables.Settings = {};
  dataTable: any;
  listOfAllEntry: TestEntryVM[];
  listOfType: any[];
  testModel = new TestEntryVM();
  getTestId: number;
  getSelDate: Date;
  loggedUserType: string;
  loggedUserName: string;
  dispCreateBtn: boolean;

  constructor(private testEntrySer: NewTestService, private http: HttpClient, private chRef: ChangeDetectorRef) {
  }

  show() {
    this.showModal = true; // Show-Hide Modal Check
  }

  hide() {
    this.showModal = false;
  }

  selectDate(getEv) {
    this.getSelDate = new Date(getEv.year, getEv.month - 1, getEv.day + 1);
  }

  SaveTestEntryData(getTestData) {
    if (this.getSelDate != null && this.getSelDate != undefined) {
      getTestData.TestDate = this.getSelDate;
    }
    this.testEntrySer.SaveTestEntryDetail(getTestData).subscribe((getResId: number) => {
      this.getTestId = getResId;
      if (this.getTestId != null && this.getTestId != undefined) {
        this.CancelTestEntry();
      }
    });
  }

  editTestEntry(getEditId) {
    this.testEntrySer.EditTestEntryData(getEditId).subscribe(editResult => {
      this.testModel["TestId"] = editResult["testId"];
      this.testModel["TestTypeId"] = editResult["testTypeId"];
      this.testModel["TypeName"] = editResult["typeName"];

      this.testModel["TestDate"] = editResult["testDate"];
      let varDate = editResult["testDate"];
      const newDate = new Date(varDate);
      this.model = { 'year': newDate.getFullYear(), 'month': newDate.getMonth() + 1, 'day': newDate.getDate() };
      this.show();
    })
  }

  deleteTestEntryRecord(getTestId) {
    if (confirm("Do you want to delete this Test with Candidate? ")) {
      this.testEntrySer.DeleteTestEntryAllData(getTestId).subscribe(delRow => {
        let getDelRow = delRow;
        if (getDelRow != 0 && getDelRow != undefined) {
          this.CancelTestEntry();
        }
      });
    }
  }

  CancelTestEntry() {
    const table: any = $('table');
    table.DataTable().destroy();
    this.testModel = new TestEntryVM();
    this.hide();
    this.ngOnInit();
  }

  preventBack() {
    window.history.forward();
  }

  ngOnInit() {
    setTimeout(() => {
      this.preventBack();
    }, 0);

    this.loggedUserName = localStorage.getItem("currentUserName");
    this.loggedUserType = localStorage.getItem("currentUserType");

    if (this.loggedUserType == "Coach") {
      this.dispCreateBtn = true;
    }
    else {
      this.dispCreateBtn = false;
    }

    this.testEntrySer.GetAllTestEntryList().subscribe((res: any[]) => {
      this.listOfAllEntry = res;
      this.chRef.detectChanges();
      const table: any = $('table');
      this.dataTable = table.DataTable();
    });

    this.testEntrySer.GetTestTypes().subscribe(res => {
      this.listOfType = res
    });


  }

}
