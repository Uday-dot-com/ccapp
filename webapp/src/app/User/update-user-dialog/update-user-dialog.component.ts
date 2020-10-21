import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from 'app/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: 'app-update-user-dialog',
  templateUrl: './update-user-dialog.component.html',
  styleUrls: ['./update-user-dialog.component.scss']
})
export class UpdateUserDialogComponent implements OnInit {
  data: any;
  userModel: any = { id: '', name: "", email: "", role: "" }
  isForEdit: boolean = false;
  roleName:any = [
    {role:'user'},
    {role:'admin'}
  ]

  constructor(public matDialogRef: MatDialogRef<UpdateUserDialogComponent>, @Inject(MAT_DIALOG_DATA) public _data: any, private apiService: ApiService, private _snackBar: MatSnackBar) {
    if (_data) {
      this.isForEdit = true;
      this.userModel.id = _data._id;
      this.userModel.name = _data.name;
      this.userModel.email = _data.email;
      this.userModel.role = _data.role;

    }
  }

  ngOnInit() {
  }
  saveUser() {
    this.apiService.editUser(this.userModel).subscribe(res => {
      if (res) {
        if (this.isForEdit == true) {
          this._snackBar.open('User Update Succesfully', 'Ok', { duration: 4000 });
        }
        else {
          this._snackBar.open('User Saved Succesfully', 'Ok', { duration: 4000 });
        }
        this.matDialogRef.close();
      }
      else {

      }
    }, (error) => {
      this._snackBar.open('Could not Save User', 'Ok', { duration: 4000, panelClass: ['errorSnackBarColor'] });
      this.matDialogRef.close();

    });
  }

}
