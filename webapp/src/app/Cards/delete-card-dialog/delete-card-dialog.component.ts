import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-delete-card-dialog',
  templateUrl: './delete-card-dialog.component.html',
  styleUrls: ['./delete-card-dialog.component.scss']
})
export class DeleteCardDialogComponent implements OnInit {
  data: any = {
    message: 'Are you sure you want to delete this Card ?',
    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
    subMessage: ''
  };
  isDisplaySubMessage: boolean = false;

  constructor(public matDialogRef: MatDialogRef<DeleteCardDialogComponent>) { }

  ngOnInit() {
    
  }

  confirm(): any {

    let dataToSendBack = {
      isConfirm: true
    }

    this.matDialogRef.close(dataToSendBack);
  }
  cancel(): any {
    let dataToSendBack = {
      isConfirm: false
    }
    let isConfirm: Boolean = false;

    this.matDialogRef.close(dataToSendBack);
  }

}
