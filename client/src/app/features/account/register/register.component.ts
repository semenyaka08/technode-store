import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {AccountService} from '../../../core/services/account.service';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {SnackbarService} from '../../../core/services/snackbar.service';
import {JsonPipe} from '@angular/common';
import {Router} from '@angular/router';
import {MatCard} from '@angular/material/card';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatButton,
    MatInput,
    JsonPipe,
    MatError,
    MatCard
  ],
  templateUrl: './register.component.html',
  standalone: true,
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private fb = inject(FormBuilder);

  private accountService = inject(AccountService);
  private snack = inject(SnackbarService);
  private router = inject(Router);
  protected validationErrors? : string[];

  registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  async onSubmit(){
    this.accountService.register(this.registerForm.value).subscribe({
      next: ()=>{
        this.snack.success("Registration successful - you can now login");
        this.router.navigateByUrl('');
      },
      error: err => this.validationErrors = err
    })
  }
}
