import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private _router: Router) {
  }
  ngOnInit() {
    if (this._router.url === '/') {
      let menuItems = JSON.parse(localStorage.getItem('menu'));
      this._router.navigate([`${menuItems[0].path}`]);
    }
  }

  isUserLoggedIn() {
    return localStorage.getItem('token');
  }
}
