import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CooperDetailService } from './CooperTestService';
import { MapCooperVM } from './MapCooperVM.module';
import { UserEntryVM } from './UserEntryVM';

@Component({
  selector: 'app-cooper-test-detail',
  templateUrl: './cooper-test-detail.component.html',
  styleUrls: ['./cooper-test-detail.component.css'],
  providers: [CooperDetailService]
})

export class CooperTestDetailComponent implements OnInit {
  showAthleteModal: boolean;
  cooperMapList: MapCooperVM[];
  athleteDDList: UserEntryVM[];
  athleteMapModel = new MapCooperVM();
  getTestId: number = 0;
  getMapId: number;
  dispTestDate: string;
  constructor(private _activateRoute: ActivatedRoute, private cooperService: CooperDetailService) { }

  show() {
    this.showAthleteModal = true; // Show-Hide Modal Check
  }

  hide() {
    this.showAthleteModal = false;
  }

  ngOnInit() {
    this.getTestId = this._activateRoute.snapshot.params['id'];
    this.dispTestDate = this._activateRoute.snapshot.params['getTestDate'];

    if (this.getTestId != 0 && this.getTestId != undefined) {
      this.getTestDetailsByTestId(this.getTestId);
    }
    this.cooperService.GetAthleteListDDL().subscribe(athList => {
      this.athleteDDList = athList;
    });

  }

  getTestDetailsByTestId(getTestId) {
    this.cooperService.GetCooperTestDetails(getTestId).subscribe(getRes => {
      this.cooperMapList = getRes;
    });
  }


  SaveAthleteDetails(getMapData) {
    getMapData.TestId = this.getTestId;
    if (getMapData.Distance != 0 && getMapData.Distance != undefined) {

      if (getMapData.Distance <= 1000) {
        getMapData.Fitness = "Below Average";
      }
      else if (getMapData.Distance > 1000 && getMapData.Distance <= 2000) {
        getMapData.Fitness = "Average";
      }
      else if (getMapData.Distance > 2000 && getMapData.Distance <= 3500) {
        getMapData.Fitness = "Good";
      }
      else if (getMapData.Distance > 3500) {
        getMapData.Fitness = "Very Good";
      }
    }
    this.cooperService.SaveAthleteDetails(getMapData).subscribe((resId: number) => {
      this.getMapId = resId;
      if (this.getMapId != null && this.getMapId != undefined) {
        this.CancelAthleteEntry();
      }
    });
  }

  editAthleteDetails(mapId) {
    this.cooperService.EditAthleteDetailByMapId(mapId).subscribe(getRes => {
      this.athleteMapModel["UserId"] = getRes["userId"];
      this.athleteMapModel["Distance"] = getRes["distance"];
      this.athleteMapModel["UserName"] = getRes["userName"];
      this.athleteMapModel["MapId"] = getRes["mapId"];
      this.show();
    });

  }

  deleteAthleteFromTest(delMapId) {
    if (confirm("Do you want to delete Athlete from the Test ")) {
      this.cooperService.DeleteAthleteData(delMapId).subscribe(getRow => {
        let rowAffted = getRow;
        if (rowAffted != 0 && rowAffted != undefined) {
          this.ngOnInit();
        }
      });
    }


  }

  CancelAthleteEntry() {
    this.athleteMapModel = new MapCooperVM();
    this.hide();
    this.ngOnInit();
  }

}
