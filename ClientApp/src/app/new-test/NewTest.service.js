"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var NewTestService = /** @class */ (function () {
    function NewTestService(_http) {
        this._http = _http;
        this.httpOption = {
            headers: new http_1.HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
    }
    NewTestService.prototype.GetAllTestEntryList = function () {
        return this._http.get('/api/NewTest/GetAllTestEntryData');
    };
    NewTestService.prototype.GetTestTypes = function () {
        return this._http.get('/api/NewTest/GetAllTestTypesList');
    };
    NewTestService.prototype.SaveTestEntryDetail = function (objTestData) {
        var body = JSON.stringify(objTestData);
        return this._http.post('/api/NewTest/SaveTestData', body, this.httpOption);
    };
    NewTestService.prototype.EditTestEntryData = function (editTestId) {
        return this._http.get('api/NewTest/GetEditTestEntry?testId=' + editTestId, this.httpOption);
    };
    NewTestService.prototype.DeleteTestEntryAllData = function (testId) {
        return this._http.post('api/NewTest/DeleteTestEntryData?testId=' + testId, this.httpOption);
    };
    NewTestService = __decorate([
        core_1.Injectable()
    ], NewTestService);
    return NewTestService;
}());
exports.NewTestService = NewTestService;
//# sourceMappingURL=NewTest.service.js.map