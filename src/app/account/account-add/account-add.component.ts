import { Component  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account } from 'src/app/Entities/Account';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-add',
  templateUrl: './account-add.component.html',
  styleUrls: ['./account-add.component.css']
})
export class AccountAddComponent {
  accountForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
  });

  constructor(private formBuilder: FormBuilder, private accountService: AccountService,private router: Router) { }

  ngOnInit(): void {
   
  }

  onSubmit(): void {
    if (this.accountForm.invalid) {
      return;
    }

    const formData = this.accountForm.value as Account;
    this.accountService.createAccount(formData)
      .subscribe(() => {
        this.router.navigate(['/accounts']);
      }, error => {
      });
  }
}
