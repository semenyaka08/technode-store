import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {AccountService} from '../../../core/services/account.service';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {ActivatedRoute, Router} from '@angular/router';
import {MatCard} from '@angular/material/card';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatButton,
    MatLabel,
    MatCard
  ],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private fb = inject(FormBuilder);

  private accountService = inject(AccountService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private readonly returnUrl = '';

  constructor() {
    const url = this.activatedRoute.snapshot.queryParams['returnUrl'];
    if(url)
      this.returnUrl = url;
  }

  loginForm = this.fb.group({
    email: [''],
    password: ['']
  });

  async onSubmit(){
    this.accountService.login(this.loginForm.value).subscribe({
      next: ()=> {
        this.accountService.getCurrentUser().subscribe(isSuccess=>{
          if(isSuccess)
             this.router.navigateByUrl(this.returnUrl);
        });
      }
    })
  }
}
