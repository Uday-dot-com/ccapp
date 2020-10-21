import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'app/api.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-updatebankdialog',
  templateUrl: './updatebankdialog.component.html',
  styleUrls: ['./updatebankdialog.component.scss']
})
export class UpdatebankdialogComponent implements OnInit {
  data: any;
  bankModel: any = { id: '', bankName: '', modifiedBy: "", modifiedDate: "" }
  isForEdit: boolean = false;
  constructor(public matDialogRef: MatDialogRef<UpdatebankdialogComponent>, @Inject(MAT_DIALOG_DATA) public _data: any, private apiService: ApiService, private _snackBar: MatSnackBar) {
    if (_data) {
      this.isForEdit = true;
      this.bankModel.id = _data._id;
      this.bankModel.bankName = _data.bankName;
      this.bankModel.modifiedBy = _data.modifiedBy;
      this.bankModel.modifiedDate = _data.modifiedDate;
    }
  }

  ngOnInit() {
  }

  updateBank() {
    this.apiService.editBanks(this.bankModel).subscribe(res => {
      if (res) {
        if (this.isForEdit == true) {
          this._snackBar.open('Updated Successfully', 'Ok', { duration: 4000 });
        }
        else {
          this._snackBar.open('Saved Successfully', 'Ok', { duration: 4000 });
        }

        this.matDialogRef.close();
      }
      else {

      }
    }, (error) => {
      this._snackBar.open('Could not Save Bank', 'Ok', { duration: 4000, panelClass: ['errorSnackBarColor'] });
      this.matDialogRef.close();
    });
  }
}
