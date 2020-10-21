import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ApiService } from 'app/api.service';

@Component({
  selector: 'app-update-card-dialog',
  templateUrl: './update-card-dialog.component.html',
  styleUrls: ['./update-card-dialog.component.scss']
})
export class UpdateCardDialogComponent implements OnInit {
  Update: any = { bank: "", cardname: "" };
  isForEdit: boolean = false;
  selectCardId: any;
  banks: any = [{ bankName: '' }];
  cards: any;
  data: any;

  constructor(@Inject(MAT_DIALOG_DATA) public _data: any, private apiService: ApiService, private _snackBar: MatSnackBar,
    private matDialogRef: MatDialogRef<UpdateCardDialogComponent>) {
    this.data = _data;
  }

  ngOnInit() {
    this.getBanks();
  }

  getBanks() {
    this.apiService.getBanks().subscribe((response: any) => {
      if (response) {
        this.banks = response;
      }
    }, (err) => {
    });
  }

  getCards() {
    this.apiService.getCards().subscribe((response: any) => {
      if (response) {
        this.cards = response;
      }
    }, (err) => {
    });
  }

  editCard() {
    this.apiService.editCard(this.data).subscribe(res => {
      if (res) {
        this._snackBar.open('Card Updated Successfully', 'Ok', { duration: 4000 });
        this.matDialogRef.close();
      }
      else {
      }
    }, (error) => {
      this._snackBar.open('Could not Save Card', 'Ok', { duration: 4000, panelClass: ['errorSnackBarColor'] });
    });
  }

}
