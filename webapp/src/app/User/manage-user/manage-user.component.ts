import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { DiagAddUserComponent } from '../diag-add-user/diag-add-user.component'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'
import { ApiService } from 'app/api.service';
import { UpdateUserDialogComponent } from '../update-user-dialog/update-user-dialog.component';
import { UserDeleteDialogComponent } from '../user-delete-dialog/user-delete-dialog.component';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);



  @Input()
  maxlength: string;
  minlength: string;


  tableModel: any = [];
  displayedColumns = ['name', 'email', 'role', 'edit', 'delete'];
  dataSource;
  showrole = {role :"admin"}

  

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private apiService: ApiService, private router: Router, private _snackBar: MatSnackBar,
    private httpService: HttpClient, private matDialog: MatDialog, private _apiService: ApiService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getUser();
  }

  adddialoguser() {
    this.matDialog
      .open(DiagAddUserComponent, { panelClass: 'confirm-dialog', hasBackdrop: true, disableClose: true, height: '380px', width: '500px' })
      .afterClosed().subscribe(
        data => {
          this.getUser();
        }
      );

  };
  editUser(_data: any) {
    this.dialog.open(UpdateUserDialogComponent, { data: _data, height: '300px', width: '500px', disableClose: false }).afterClosed().subscribe(() => {

      this.getUser();
    })

  };

  deleteUser(id: any):any {
    this.dialog.open(UserDeleteDialogComponent, { panelClass: 'confirm-dialog' }).afterClosed().subscribe((response: any) => {

      if (response.isConfirm == true) {
        this._apiService.deleteUser(id).subscribe((res) => {
          this._snackBar.open('User Deleted Successdully', 'Ok', { duration: 4000 });
          this.getUser();

        }, (error) => {
          this._snackBar.open('User not Delete ', 'Ok', { duration: 4000, panelClass: ['errorSnackBarColor'] });

        });
      }
    });
  }

  getUser() {
    this.apiService.getUser().subscribe(res => {
      if (res) {
        this.dataSource = new MatTableDataSource(res)
        this.dataSource.paginator = this.paginator;
      }
    }, (err) => {

    });
  }
}
