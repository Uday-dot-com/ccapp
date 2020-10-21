import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppComponent } from './app.component';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { MatCardModule, MatIconModule } from '@angular/material';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { AuthinterceptorService } from './authinterceptor.service';
import { ApiService } from './api.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonFunction } from './commonFunctions';
import { UpdatebankdialogComponent } from './Banks/updatebankdialog/updatebankdialog.component';
import { AddBankdialogComponent } from './Banks/add-bankdialog/add-bankdialog.component';
import { DeleteBankDialogComponent } from './Banks/delete-bank-dialog/delete-bank-dialog.component';
import { UserDeleteDialogComponent } from './User/user-delete-dialog/user-delete-dialog.component';
import { DiagAddUserComponent } from './User/diag-add-user/diag-add-user.component';
import { UpdateUserDialogComponent } from './User/update-user-dialog/update-user-dialog.component';
import { AddCardDialogComponent } from './Cards/add-card-dialog/add-card-dialog.component';
import { DeleteCardDialogComponent } from './Cards/delete-card-dialog/delete-card-dialog.component';
import { UpdateCardDialogComponent } from './Cards/update-card-dialog/update-card-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule, HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatInputModule,
    MatDividerModule,
    MatIconModule,
    MatSnackBarModule, MatMenuModule, MatTableModule, FlexLayoutModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    UpdatebankdialogComponent,
    AddBankdialogComponent,
    DeleteBankDialogComponent,
    DiagAddUserComponent,
    UserDeleteDialogComponent,
    UpdateUserDialogComponent,
    AddCardDialogComponent,
    DeleteCardDialogComponent,
    UpdateCardDialogComponent,

  ],
  entryComponents: [
    UpdatebankdialogComponent,
    AddBankdialogComponent,
    DeleteBankDialogComponent,
    DiagAddUserComponent,
    UserDeleteDialogComponent,
    UpdateUserDialogComponent,
    AddCardDialogComponent,
    DeleteCardDialogComponent,
    UpdateCardDialogComponent
  ],
  providers: [CommonFunction, ApiService, AuthService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthinterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
