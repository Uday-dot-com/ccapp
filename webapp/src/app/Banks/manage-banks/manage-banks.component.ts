import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'app/api.service';
import { AddBankdialogComponent } from '../add-bankdialog/add-bankdialog.component';
import { UpdatebankdialogComponent } from '../updatebankdialog/updatebankdialog.component';
import { DeleteBankDialogComponent } from '../delete-bank-dialog/delete-bank-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-manage-banks',
  templateUrl: './manage-banks.component.html',
  styleUrls: ['./manage-banks.component.scss']
})
export class ManageBanksComponent implements OnInit {
  displayedColumns: string[] = ['bankName', 'edit', 'delete'];
  banks: any;
  bank: any;
  isConfirm: boolean = false;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private _apiService: ApiService, private _snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit() {
    this.getBanks();
  }

  getBanks() {
    this._apiService.getBanks().subscribe((res) => {
      if (res) {
        this.banks = new MatTableDataSource(res);
        //this.banks = res;
        this.banks.paginator = this.paginator;
      }
    }), (error) => {

    }
  }

  addbankdialog() {
    this.dialog.open(AddBankdialogComponent, { panelClass: 'confirm-dialog', width: '500px', height: '240px', hasBackdrop: true, disableClose: true }).afterClosed().subscribe(() => {
      this.getBanks();
    });
  }

  editBank(_data: any) {
    this.dialog.open(UpdatebankdialogComponent, { data: _data, width: '500px', height: '280px' }).afterClosed().subscribe(() => {
      this.getBanks();
    });
  }

  deleteBank(id: any) {
    this.dialog.open(DeleteBankDialogComponent, { panelClass: 'confirm-dialog' }).afterClosed().subscribe((response: any) => {
      if (response.isConfirm == true) {
        this._apiService.deleteBanks(id).subscribe((res) => {
          if (res) {
            var jstring = JSON.stringify(res);
            var jsonObject = JSON.parse(jstring);
            var message = jsonObject.message;
            if (message == "Successfully Deleted") {
              this._snackBar.open('Deleted Successfully', 'Ok', { duration: 4000 });
              this.getBanks();
            }
            if (message == "Bank Cannot be Deleted") {
              this._snackBar.open('Bank cannot be deleted', 'Ok', { duration: 4000, panelClass: ['errorSnackBarColor'] });
              this.getBanks();
            }
          }
        }, (error) => {
          this._snackBar.open('Could not Delete Bank', 'Ok', { duration: 4000, panelClass: ['errorSnackBarColor'] });
        });
      }
    });
  }
}
