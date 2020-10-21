import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'app/api.service';
import { MatSnackBar } from '@angular/material';
import * as NodeRSA from 'node-rsa';

@Component({
  selector: 'app-add-bankdialog',
  templateUrl: './add-bankdialog.component.html',
  styleUrls: ['./add-bankdialog.component.scss']
})
export class AddBankdialogComponent implements OnInit {
  key:any;
  data: any;
  bankModel: any = { bankName: '', modifiedBy: '', modifiedDate: '' };
  isForEdit: boolean = false;
  constructor(public matDialogRef: MatDialogRef<AddBankdialogComponent>, @Inject(MAT_DIALOG_DATA) public _data: any, private apiService: ApiService, private _snackBar: MatSnackBar) {
    if (_data) {
      this.isForEdit = true;
      this.bankModel.bankName = _data.bankName;
      this.bankModel.modifiedBy = _data.modifiedBy;
      this.bankModel.modifiedDate = _data.modifiedDate;
    }
  }

  ngOnInit() {

  }

  saveBankType() {
    //var r=this.key.generateKeyPair(2048, 65537);
      //console.log(r);
    this.apiService.saveBank(this.bankModel).subscribe(res => {
      if (res) {
        var jstring = JSON.stringify(res);
        var jsonObject = JSON.parse(jstring);
        var message = jsonObject.message;
        if (message == "Successfully Added") {
          this._snackBar.open('Bank Added Successfully', 'Ok', { duration: 4000 });
        }
        if (message == "Adding Bank Error") {
          this._snackBar.open('Bank Name Already exist', 'Ok', { duration: 4000, panelClass: ['errorSnackBarColor'] });
        }
        this.matDialogRef.close();
      }
    }, (error) => {
      this._snackBar.open('Bank already exist', 'Ok', { duration: 4000, panelClass: ['errorSnackBarColor'] });
    });
  }

}
