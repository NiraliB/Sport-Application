import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewTestComponent } from './new-test/new-test.component';
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from '@angular/router';
import { CooperTestDetailComponent } from './cooper-test-detail/cooper-test-detail.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    NewTestComponent,
    CooperTestDetailComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    NgbModule,
    FormsModule,
    DataTablesModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'login', pathMatch: 'full', },
      { path: 'login',component: LoginComponent, data: {title: 'Login Page'} },
      { path: 'NewTest', component: NewTestComponent },
      { path: 'CooperTestDetail/:id/:getTestDate/Details', component: CooperTestDetailComponent },
      { path: 'mainComponent', component: AppComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
