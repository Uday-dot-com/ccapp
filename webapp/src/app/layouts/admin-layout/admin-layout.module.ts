import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { MatCardModule } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { GenerateReportComponent } from '../../generate-report/generate-report.component';
import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule
} from '@angular/material';
import { MatStepperModule } from '@angular/material';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ManageBanksComponent } from 'app/Banks/manage-banks/manage-banks.component';
import { ManageUserComponent } from 'app/User/manage-user/manage-user.component';
import { ManageCardsComponent } from 'app/Cards/manage-cards/manage-cards.component'
import { CardFilldetailsComponent } from '../../Cards/card-filldetails/card-filldetails.component';
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule, MatStepperModule, FlexLayoutModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ],
  declarations: [
    ManageUserComponent,
    ManageBanksComponent,
    ManageCardsComponent,
    GenerateReportComponent,
    CardFilldetailsComponent
  ]
})

export class AdminLayoutModule {}
