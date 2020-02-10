"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var TestEntry_module_1 = require("./TestEntry.module");
var NewTest_service_1 = require("./NewTest.service");
var NewTestComponent = /** @class */ (function () {
    function NewTestComponent(testEntrySer, http, chRef) {
        this.testEntrySer = testEntrySer;
        this.http = http;
        this.chRef = chRef;
        this.dispText = "You can add or show created Tests";
        this.dtOptions = {};
        this.testModel = new TestEntry_module_1.TestEntryVM();
    }
    NewTestComponent.prototype.show = function () {
        this.showModal = true; // Show-Hide Modal Check
    };
    NewTestComponent.prototype.hide = function () {
        this.showModal = false;
    };
    NewTestComponent.prototype.selectDate = function (getEv) {
        this.getSelDate = new Date(getEv.year, getEv.month - 1, getEv.day + 1);
    };
    NewTestComponent.prototype.SaveTestEntryData = function (getTestData) {
        var _this = this;
        if (this.getSelDate != null && this.getSelDate != undefined) {
            getTestData.TestDate = this.getSelDate;
        }
        this.testEntrySer.SaveTestEntryDetail(getTestData).subscribe(function (getResId) {
            _this.getTestId = getResId;
            if (_this.getTestId != null && _this.getTestId != undefined) {
                _this.CancelTestEntry();
            }
        });
    };
    NewTestComponent.prototype.editTestEntry = function (getEditId) {
        var _this = this;
        this.testEntrySer.EditTestEntryData(getEditId).subscribe(function (editResult) {
            _this.testModel["TestId"] = editResult["testId"];
            _this.testModel["TestTypeId"] = editResult["testTypeId"];
            _this.testModel["TypeName"] = editResult["typeName"];
            _this.testModel["TestDate"] = editResult["testDate"];
            var varDate = editResult["testDate"];
            var newDate = new Date(varDate);
            _this.model = { 'year': newDate.getFullYear(), 'month': newDate.getMonth() + 1, 'day': newDate.getDate() };
            _this.show();
        });
    };
    NewTestComponent.prototype.deleteTestEntryRecord = function (getTestId) {
        var _this = this;
        if (confirm("Do you want to delete this Test with Candidate? ")) {
            this.testEntrySer.DeleteTestEntryAllData(getTestId).subscribe(function (delRow) {
                var getDelRow = delRow;
                if (getDelRow != 0 && getDelRow != undefined) {
                    _this.CancelTestEntry();
                }
            });
        }
    };
    NewTestComponent.prototype.CancelTestEntry = function () {
        var table = $('table');
        table.DataTable().destroy();
        this.testModel = new TestEntry_module_1.TestEntryVM();
        this.hide();
        this.ngOnInit();
    };
    NewTestComponent.prototype.preventBack = function () {
        window.history.forward();
    };
    NewTestComponent.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.preventBack();
        }, 0);
        this.loggedUserName = localStorage.getItem("currentUserName");
        this.loggedUserType = localStorage.getItem("currentUserType");
        if (this.loggedUserType == "Coach") {
            this.dispCreateBtn = true;
        }
        else {
            this.dispCreateBtn = false;
        }
        this.testEntrySer.GetAllTestEntryList().subscribe(function (res) {
            _this.listOfAllEntry = res;
            _this.chRef.detectChanges();
            var table = $('table');
            _this.dataTable = table.DataTable();
        });
        this.testEntrySer.GetTestTypes().subscribe(function (res) {
            _this.listOfType = res;
        });
    };
    NewTestComponent = __decorate([
        core_1.Component({
            selector: 'app-new-test',
            templateUrl: './new-test.component.html',
            styleUrls: ['./new-test.component.css'],
            providers: [NewTest_service_1.NewTestService]
        })
    ], NewTestComponent);
    return NewTestComponent;
}());
exports.NewTestComponent = NewTestComponent;
//# sourceMappingURL=new-test.component.js.map