import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {AccountService} from '../../../core/services/account.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {LoginComponent} from '../login/login.component';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {SnackbarService} from '../../../core/services/snackbar.service';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatButton,
    MatInput,
    JsonPipe,
    MatError
  ],
  templateUrl: './register.component.html',
  standalone: true,
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private fb = inject(FormBuilder);

  private accountService = inject(AccountService);
  private dialog = inject(MatDialog);
  private dialogRef = inject(MatDialogRef<RegisterComponent>);
  private snack = inject(SnackbarService);
  protected validationErrors? : string[];

  registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  onSubmit(){
    this.accountService.register(this.registerForm.value).subscribe({
      next: ()=>{
        this.snack.success("Registration successful - you can now login")
        this.dialogRef.close();
        this.dialog.open(LoginComponent, {maxWidth: "400px"});
      },
      error: err => this.validationErrors = err
    })
  }
}
