import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Appointment } from 'src/app/Entities/Appointment';
import { AppointmentService } from 'src/app/services/appointment.service';
import { ClientService } from 'src/app/services/client.service';
import {NativeDateAdapter} from '@angular/material/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css'],
  providers:[NativeDateAdapter]
})
export class AddAppointmentComponent {
  appointmentForm: FormGroup = this.formBuilder.group({
    appointmentStartTime: ['', Validators.required],
    appointmentEndTime: ['', Validators.required],
    clientID: [''],
    accountID:['']
  });
  clients:any[]=[];
  accounts:any[]=[];

  constructor(private formBuilder: FormBuilder, private accountService: AccountService,private clientService: ClientService,private appointmentService: AppointmentService,private router: Router) { }

  ngOnInit(): void {   

    this.accountService.getAccounts(0,25,null)
    .subscribe((data: any) =>  {
      console.log(data.accounts);
      this.accounts = data.accounts;
    }, error => {
    });
  }

  onAccountChange(accountID:number){
    console.log(accountID);
   return this.clientService.getClients(0,25,accountID,null)
    .subscribe((data: any) =>  {
      console.log(data.clients);
      this.clients = data.clients;
    }, error => {
    });
  }

  onSubmit(): void {
    if (this.appointmentForm.invalid) {
      return;
    }

    const formData = this.appointmentForm.value as Appointment;
    formData.CreatedDate=new Date();
    formData.ModifiedDate=new Date();
    formData.ClientName="";
    console.log(formData);
    this.appointmentService.createAppointment(formData)
      .subscribe(() => {
        this.router.navigate(['/appointments']);
      }, error => {
      });
  }
}
