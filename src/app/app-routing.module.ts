import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoriesListComponent } from './stories-list/stories-list.component';
import { AppComponent } from './app.component';
import { AccountComponent } from './account/account.component';
import { ClientComponent } from './client/client.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { AccountAddComponent } from './account/account-add/account-add.component';
import { AddClientComponent } from './client/add-client/add-client.component';
import { AddAppointmentComponent } from './appointment/add-appointment/add-appointment.component';

const routes: Routes = [
  { path: 'accounts', component: AccountComponent },
  { path: 'clients', component: ClientComponent },
  { path: 'appointments', component: AppointmentComponent },
  { path: '', component: AppointmentComponent },
  { path:'addAccount',component:AccountAddComponent},
  { path:'addClient',component:AddClientComponent},
  { path:'addAppointment',component:AddAppointmentComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppRoutingModule { }
