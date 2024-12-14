import {Component, inject} from '@angular/core';
import {CurrencyPipe, Location} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {CartService} from '../../../core/services/cart.service';
import {Router, RouterLink} from '@angular/router';
import {AccountService} from '../../../core/services/account.service';
import {MatDialog} from '@angular/material/dialog';
import {LoginComponent} from '../../../features/account/login/login.component';

@Component({
  selector: 'app-order-summary',
  imports: [
    CurrencyPipe,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    RouterLink
  ],
  templateUrl: './order-summary.component.html',
  standalone: true,
  styleUrl: './order-summary.component.scss'
})
export class OrderSummaryComponent {
  protected cartService = inject(CartService);
  private router = inject(Router);
  private accountService = inject(AccountService);
  private dialog = inject(MatDialog);
  protected location = inject(Location);

  onCheckout() {
    if(this.accountService.currentUser()){
      this.router.navigate(['/checkout']);
    }
    else{
      const dialogRef = this.dialog.open(LoginComponent, {
        width: '400px'
      });

      dialogRef.afterClosed().subscribe(() => {
        if (this.accountService.currentUser()) {
          this.router.navigate(['/checkout']);
        }
      });
    }
  }
}
