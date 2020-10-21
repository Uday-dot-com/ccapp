import { Routes } from '@angular/router';
import { GenerateReportComponent } from '../../generate-report/generate-report.component';
import { ManageBanksComponent } from 'app/Banks/manage-banks/manage-banks.component';
import { ManageUserComponent } from 'app/User/manage-user/manage-user.component';
import { ManageCardsComponent } from 'app/Cards/manage-cards/manage-cards.component';
import { CardFilldetailsComponent } from 'app/Cards/card-filldetails/card-filldetails.component';
export const AdminLayoutRoutes: Routes = [
    { path: 'add-user',      component: ManageUserComponent },
    { path: 'add-bank',      component: ManageBanksComponent },
    { path: 'add-card',      component: ManageCardsComponent },
    { path: 'generate-report',      component: GenerateReportComponent },
    { path: 'card-filldetails/:id',      component: CardFilldetailsComponent }  
];
