import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'app/api.service';

@Component({
  selector: 'app-user-delete-dialog',
  templateUrl: './user-delete-dialog.component.html',
  styleUrls: ['./user-delete-dialog.component.scss']
})
export class UserDeleteDialogComponent implements OnInit {
  data: any = {
    message: 'Are you sure you want to delete this user ?',

    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
    subMessage: ''
  };
  isDisplaySubMessage: boolean = false;

  constructor(private apiService: ApiService, public matDialogRef: MatDialogRef<UserDeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) public _data: any) {
    if (_data != null && _data != undefined) {
      for (let key in _data) {
        if (_data[key] != undefined && _data[key] != null) {
          this.data[key] = _data[key];
        }
      }
      if (this.data.subMessage != undefined && this.data.subMessage != null) {
        this.isDisplaySubMessage = true;
      }
    }

  }

  ngOnInit() {
  }
  cancel(): any {
    let dataToSendBack = {
      isConfirm: false
    }

    this.matDialogRef.close(dataToSendBack);
  }

  confirm(): any {

    let dataToSendBack = {
      isConfirm: true
    }

    this.matDialogRef.close(dataToSendBack);
  }

}
