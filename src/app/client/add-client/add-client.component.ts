import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from 'src/app/Entities/Account';
import { Client } from 'src/app/Entities/Client';
import { AccountService } from 'src/app/services/account.service';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent {
  clientForm: FormGroup = this.formBuilder.group({
    clientName: ['', Validators.required],
    accountID: [''] 
  });
  accounts:any[]=[];

  constructor(private formBuilder: FormBuilder, private clientService: ClientService,private accountService: AccountService,private router: Router) { }

  ngOnInit(): void {
    this.accountService.getAccounts(0,25,null)
    .subscribe((data: any) =>  {
      console.log(data.accounts);
      this.accounts = data.accounts;
    }, error => {
    });
  }

  onSubmit(): void {
    if (this.clientForm.invalid) {
      return;
    }

    const formData = this.clientForm.value as Client;
    formData.CreatedDate=new Date();
    formData.ModifiedDate=new Date();
    formData.AccountName="";
    this.clientService.createClient(formData)
      .subscribe(() => {
        this.router.navigate(['/clients']);
      }, error => {
      });
  }
}
