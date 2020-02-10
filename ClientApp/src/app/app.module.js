"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var new_test_component_1 = require("./new-test/new-test.component");
var http_1 = require("@angular/common/http");
var router_1 = require("@angular/router");
var cooper_test_detail_component_1 = require("./cooper-test-detail/cooper-test-detail.component");
var angular_font_awesome_1 = require("angular-font-awesome");
var forms_1 = require("@angular/forms");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var angular_datatables_1 = require("angular-datatables");
var login_component_1 = require("./login/login.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                new_test_component_1.NewTestComponent,
                cooper_test_detail_component_1.CooperTestDetailComponent,
                login_component_1.LoginComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                http_1.HttpClientModule,
                angular_font_awesome_1.AngularFontAwesomeModule,
                ng_bootstrap_1.NgbModule,
                forms_1.FormsModule,
                angular_datatables_1.DataTablesModule,
                router_1.RouterModule.forRoot([
                    { path: '', redirectTo: 'login', pathMatch: 'full', },
                    { path: 'login', component: login_component_1.LoginComponent, data: { title: 'Login Page' } },
                    { path: 'NewTest', component: new_test_component_1.NewTestComponent },
                    { path: 'CooperTestDetail/:id/:getTestDate/Details', component: cooper_test_detail_component_1.CooperTestDetailComponent },
                    { path: 'mainComponent', component: app_component_1.AppComponent }
                ])
            ],
            providers: [],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map