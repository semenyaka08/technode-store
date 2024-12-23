import {Component, inject, signal} from '@angular/core';

import {MatIcon} from '@angular/material/icon';
import {MatAnchor, MatButton, MatIconButton} from '@angular/material/button';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {MatBadge} from '@angular/material/badge';
import {CartService} from '../../core/services/cart.service';
import {MatDialog} from '@angular/material/dialog';
import {RegisterComponent} from '../../features/account/register/register.component';
import {AccountService} from '../../core/services/account.service';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatDivider} from '@angular/material/divider';
import {IsAdminDirective} from '../../shared/directives/is-admin.directive';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatBadge,
    MatIcon,
    MatButton,
    MatAnchor,
    MatFormField,
    MatInput,
    MatIconButton,
    MatFormFieldModule,
    RouterLink,
    FormsModule,
    MatMenu,
    MatMenuTrigger,
    MatMenuItem,
    MatDivider,
    IsAdminDirective,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  router = inject(Router);
  protected cartService = inject(CartService);
  protected accountService = inject(AccountService);

  private dialogService = inject(MatDialog);

  searchPhrase = signal<string | undefined>(undefined);

  openRegisterDialog(){
    this.dialogService.open(RegisterComponent, {
      maxWidth: '400px'
    });
  }

  logout() {
    this.accountService.logout().subscribe({
      next: ()=> this.accountService.currentUser.set(null)
    });

  }
}
