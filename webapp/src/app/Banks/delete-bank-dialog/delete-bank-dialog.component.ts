import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ApiService } from 'app/api.service';

@Component({
  selector: 'app-delete-bank-dialog',
  templateUrl: './delete-bank-dialog.component.html',
  styleUrls: ['./delete-bank-dialog.component.scss']
})
export class DeleteBankDialogComponent implements OnInit {
  data: any = {
    message: 'Are you sure you want to delete this bank ?',
    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
    subMessage: ''
  };
  isDisplaySubMessage: boolean = false;

  constructor(private apiService: ApiService, public matDialogRef: MatDialogRef<DeleteBankDialogComponent>, @Inject(MAT_DIALOG_DATA) public _data: any) {
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
