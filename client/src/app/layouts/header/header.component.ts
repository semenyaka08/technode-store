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
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  router = inject(Router);
  protected cartService = inject(CartService);

  searchPhrase = signal<string | undefined>(undefined);
}
