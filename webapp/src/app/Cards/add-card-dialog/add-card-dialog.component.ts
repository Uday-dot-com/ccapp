import { ApiService } from 'app/api.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialogRef } from '@angular/material';
import { Messages } from 'app/messages';

@Component({
  selector: 'app-add-card-dialog',
  templateUrl: './add-card-dialog.component.html',
  styleUrls: ['./add-card-dialog.component.scss']
})
export class AddCardDialogComponent implements OnInit {

  displayedColumns: string[] = ['bankName', 'cardName', 'action'];
  cardModel: any = { cardName: '' };
  banks: any = [{ bankName: '' }];
  cards: any;
  bank: any;
  cardName: any;
  isForEdit: boolean = false;

  constructor(public matDialogRef: MatDialogRef<AddCardDialogComponent>, private _apiService: ApiService, private _snackBar: MatSnackBar, ) { }

  ngOnInit() {
    this.getBanks();
  }
  getBanks() {
    this._apiService.getBanks().subscribe((response: any) => {
      if (response) {
        this.banks = response;
      }
    }, (err) => {
      console.log(err);
    });
  }

  getCards() {
    this._apiService.getCards().subscribe((response: any) => {
      if (response) {
        this.cards = response;
      }
    }, (err) => {
      console.log(err);
    });
  }

  addCard() {
    let obj = { cardName: this.cardName, bank: this.bank };
    this._apiService.saveCard(obj).subscribe((response: any) => {
      if (response) {
        this.getCards();
        this._snackBar.open(Messages.CARD_SAVED_SUCCESS, Messages.OK, {
          duration: 4000,
        });
        this.matDialogRef.close();
      }
    }, (err) => {
      this._snackBar.open('Card already exist', 'Ok', { duration: 4000, panelClass: ['errorSnackBarColor'] });
    });
  }

}
