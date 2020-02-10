"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var CooperDetailService = /** @class */ (function () {
    function CooperDetailService(_http) {
        this._http = _http;
        this.httpOption = {
            headers: new http_1.HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
    }
    CooperDetailService.prototype.GetCooperTestDetails = function (testId) {
        return this._http.get('api/CooperTest/GetAthleteDetailByTID?getTestId=' + testId, this.httpOption);
    };
    CooperDetailService.prototype.GetAthleteListDDL = function () {
        return this._http.get('api/CooperTest/GetAthleteNameList');
    };
    CooperDetailService.prototype.SaveAthleteDetails = function (objMapData) {
        var body = JSON.stringify(objMapData);
        return this._http.post('/api/CooperTest/SaveAthleteData', body, this.httpOption);
    };
    CooperDetailService.prototype.EditAthleteDetailByMapId = function (editMapId) {
        return this._http.get('api/CooperTest/GetEditAthleteDetails?mapId=' + editMapId, this.httpOption);
    };
    CooperDetailService.prototype.DeleteAthleteData = function (delMapId) {
        return this._http.post('api/CooperTest/DeleteAthleteByMapId?mapId=' + delMapId, this.httpOption);
    };
    CooperDetailService = __decorate([
        core_1.Injectable()
    ], CooperDetailService);
    return CooperDetailService;
}());
exports.CooperDetailService = CooperDetailService;
//# sourceMappingURL=CooperTestService.js.map