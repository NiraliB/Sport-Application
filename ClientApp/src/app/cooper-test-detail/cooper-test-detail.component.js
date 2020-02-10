"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var CooperTestService_1 = require("./CooperTestService");
var MapCooperVM_module_1 = require("./MapCooperVM.module");
var CooperTestDetailComponent = /** @class */ (function () {
    function CooperTestDetailComponent(_activateRoute, cooperService) {
        this._activateRoute = _activateRoute;
        this.cooperService = cooperService;
        this.athleteMapModel = new MapCooperVM_module_1.MapCooperVM();
        this.getTestId = 0;
    }
    CooperTestDetailComponent.prototype.show = function () {
        this.showAthleteModal = true; // Show-Hide Modal Check
    };
    CooperTestDetailComponent.prototype.hide = function () {
        this.showAthleteModal = false;
    };
    CooperTestDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getTestId = this._activateRoute.snapshot.params['id'];
        this.dispTestDate = this._activateRoute.snapshot.params['getTestDate'];
        if (this.getTestId != 0 && this.getTestId != undefined) {
            this.getTestDetailsByTestId(this.getTestId);
        }
        this.cooperService.GetAthleteListDDL().subscribe(function (athList) {
            _this.athleteDDList = athList;
        });
    };
    CooperTestDetailComponent.prototype.getTestDetailsByTestId = function (getTestId) {
        var _this = this;
        this.cooperService.GetCooperTestDetails(getTestId).subscribe(function (getRes) {
            _this.cooperMapList = getRes;
        });
    };
    CooperTestDetailComponent.prototype.SaveAthleteDetails = function (getMapData) {
        var _this = this;
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
        this.cooperService.SaveAthleteDetails(getMapData).subscribe(function (resId) {
            _this.getMapId = resId;
            if (_this.getMapId != null && _this.getMapId != undefined) {
                _this.CancelAthleteEntry();
            }
        });
    };
    CooperTestDetailComponent.prototype.editAthleteDetails = function (mapId) {
        var _this = this;
        this.cooperService.EditAthleteDetailByMapId(mapId).subscribe(function (getRes) {
            _this.athleteMapModel["UserId"] = getRes["userId"];
            _this.athleteMapModel["Distance"] = getRes["distance"];
            _this.athleteMapModel["UserName"] = getRes["userName"];
            _this.athleteMapModel["MapId"] = getRes["mapId"];
            _this.show();
        });
    };
    CooperTestDetailComponent.prototype.deleteAthleteFromTest = function (delMapId) {
        var _this = this;
        if (confirm("Do you want to delete Athlete from the Test ")) {
            this.cooperService.DeleteAthleteData(delMapId).subscribe(function (getRow) {
                var rowAffted = getRow;
                if (rowAffted != 0 && rowAffted != undefined) {
                    _this.ngOnInit();
                }
            });
        }
    };
    CooperTestDetailComponent.prototype.CancelAthleteEntry = function () {
        this.athleteMapModel = new MapCooperVM_module_1.MapCooperVM();
        this.hide();
        this.ngOnInit();
    };
    CooperTestDetailComponent = __decorate([
        core_1.Component({
            selector: 'app-cooper-test-detail',
            templateUrl: './cooper-test-detail.component.html',
            styleUrls: ['./cooper-test-detail.component.css'],
            providers: [CooperTestService_1.CooperDetailService]
        })
    ], CooperTestDetailComponent);
    return CooperTestDetailComponent;
}());
exports.CooperTestDetailComponent = CooperTestDetailComponent;
//# sourceMappingURL=cooper-test-detail.component.js.map