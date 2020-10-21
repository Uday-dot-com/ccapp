import { Component, OnInit, Inject, ViewChild, AfterViewInit, ElementRef, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { AuthService } from 'app/auth.service';
import { ApiService } from 'app/api.service';
import { Messages } from 'app/messages';

@Component({
  selector: 'app-diag-add-user',
  templateUrl: './diag-add-user.component.html',
  styleUrls: ['./diag-add-user.component.scss']
})
export class DiagAddUserComponent implements OnInit {
  data: any;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(
      /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.((com|net|info|in|name))$/)
  ]
  );

  validPassword = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(20)
  ]);

  userModel: any = { email: '', password: '', name: '', role: 'user' };
  userName: any;
  userEmail: any;

  constructor(private authService: AuthService, private _snackBar: MatSnackBar, public dialogRef: MatDialogRef<DiagAddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public _data: any) {
    this.data = _data;
  }

  ngOnInit() {
    this.getUser();
  }

  addUser() {
    this.authService.saveUser(this.userModel).subscribe(res => {
      if (res) {
        this._snackBar.open(Messages.USER_SAVED_SUCCESS, Messages.OK, {
          duration: 4000,
        });

      }

    }, (err) => {
      let message: any = '';
      if (err.error.err.includes('duplicate key error')) {
        message = 'User Already Exists'
      } else {
        message = Messages.USER_FAILED_SAVE;
      }
      this._snackBar.open(message, Messages.OK, {
        duration: 4000,
      });
    });
  }
  getUser() {

  }
}
