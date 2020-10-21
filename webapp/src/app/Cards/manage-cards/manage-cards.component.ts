import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { ApiService } from 'app/api.service';
import { UpdateCardDialogComponent } from '../update-card-dialog/update-card-dialog.component';
import { AddCardDialogComponent } from '../add-card-dialog/add-card-dialog.component';
import { DeleteCardDialogComponent } from '../delete-card-dialog/delete-card-dialog.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-manage-cards',
  templateUrl: './manage-cards.component.html',
  styleUrls: ['./manage-cards.component.scss']
})
export class ManageCardsComponent implements OnInit {
  data:any;
  displayedColumns: string[] = ['bankName', 'cardName', 'details', 'edit', 'delete'];
  cardModel: any = { cardName: '' };
  banks: any = { 'bankName': '' };
  cards: any;
  bank: any;
  cardName: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor( private _apiService: ApiService, private _snackBar: MatSnackBar, private dialog: MatDialog, private _router: Router) { 
  
  }

  ngOnInit() {
    this.getBanks();
    this.getCards();
  }

  getBanks() {
    this._apiService.getBanks().subscribe((response) => {
      if (response) {
        this.banks = new MatTableDataSource(response);
        this.banks.paginator = this.paginator;
      }
    }, (err) => {
      console.log(err);
    });
  }

  getCards() {
    this._apiService.getCards().subscribe((response) => {
      if (response) {
        this.cards = new MatTableDataSource(response);
        this.cards.paginator = this.paginator;
      }
    }, (err) => {
    });
  }

  fillDetails(data: any) {
    this._router.navigate(['/card-filldetails/'+ data._id]);
  }

  editCard(_data: any) {
    this.dialog.open(UpdateCardDialogComponent, { data: _data, height: '330px', width: '600px' }).afterClosed().subscribe(() => {
      this.getCards();
    });
  }

  addCard() {
    this.dialog.open(AddCardDialogComponent, { height: '330px', width: '600px', disableClose: true }).afterClosed().subscribe(() => {
      this.getCards();
    })
  }

  deleteCard(id: any) {
    this.dialog.open(DeleteCardDialogComponent, { panelClass: 'confirm-dialog' }).afterClosed().subscribe((response: any) => {
      if (response.isConfirm == true) {
        this._apiService.deleteCard(id).subscribe((res) => {
          this._snackBar.open('Card Deleted Successfully', 'Ok', { duration: 4000 });
          this.getCards();
        }, (error) => {
          this._snackBar.open('Card Not Deleted', 'Ok', { duration: 4000, panelClass: ['errorSnackBarColor'] });
        });
      }
    });
    this.getBanks();
  }
}
