import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../auth.service';
import { ApiService } from '../api.service';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginData: any = { email: '', password: '' }
  constructor(private _router: Router, public apiService: ApiService, private authService: AuthService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  login() {
    this.authService.userLogin(this.loginData).subscribe(res => {
      if (res !== null && res !== undefined && res.token !== undefined) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('currentUserEmail', res.email);
        localStorage.setItem('menu', JSON.stringify(res.menu));
        localStorage.setItem('name', res.name);
        let menuItems = JSON.parse(localStorage.getItem('menu'));
        this._router.navigate([`${menuItems[0].path}`]);
        this._snackBar.open('User Successfully logged in', 'Ok', { duration: 4000 });
      } else
      {
      var jstring = JSON.stringify(res);
      var jsonObject = JSON.parse(jstring);
      var message = jsonObject.message;
       if (message == "User Does not Exist") {
        this._snackBar.open(message, 'Ok', { duration: 4000, panelClass: ['errorSnackBarColor'] });
      }
      if (message == "Email or Password is Invalid") {
        this._snackBar.open(message, 'Ok', { duration: 4000, panelClass: ['errorSnackBarColor'] });
      }
    }

    });
  }
}
