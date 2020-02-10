import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { UserLogin } from './UserLogin';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  loginModel = new UserLogin();
  errorMessage: string;
  loggedUserName: string;

  constructor(private router: Router, private LoginService: LoginService, private appComp: AppComponent) { }

  Login(getLoginData) {
    this.LoginService.GetLogin(getLoginData).subscribe(getUser => {
      this.appComp.hideBtn = true;
      localStorage.setItem('currentUserId', getUser["userId"]);
      localStorage.setItem('currentUserName', getUser["userName"]);
      localStorage.setItem('currentUserType', getUser["userType"]);
      this.router.navigate(['/NewTest']);
    })
  }

  ngOnInit() {
    sessionStorage.removeItem('UserName');
    sessionStorage.clear();
  }

}
