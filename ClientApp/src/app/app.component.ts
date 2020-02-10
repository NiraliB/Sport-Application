import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageTitle = 'Sports Application';
  hideBtn: boolean = false;

  constructor(private router: Router) { }

  preventBack() {
    window.history.forward();
  }

  LogOut() {
    localStorage.removeItem('currentUserId');
    localStorage.removeItem('currentUserName');
    localStorage.removeItem('currentUserType');
    this.hideBtn = false;
    setTimeout("preventBack()", 0);
    window.onunload = function () { null };
    this.router.navigate(['/login']);
  }

}

