import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {AccountService} from '../../../core/services/account.service';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatButton,
    MatLabel
  ],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private fb = inject(FormBuilder);

  private accountService = inject(AccountService);
  private dialogRef = inject(MatDialogRef<LoginComponent>);


  loginForm = this.fb.group({
    email: [''],
    password: ['']
  });

  onSubmit(){
    this.accountService.login(this.loginForm.value).subscribe({
      next: ()=> {
        this.accountService.getCurrentUser().subscribe(isSuccess=>{
          if(isSuccess)
            this.dialogRef.close();
        });
      }
    })
  }
}
