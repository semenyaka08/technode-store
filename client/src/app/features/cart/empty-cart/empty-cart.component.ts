import { Component } from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-empty-cart',
  imports: [
    MatIcon,
    MatButton,
    RouterLink,
  ],
  templateUrl: './empty-cart.component.html',
  standalone: true,
  styleUrl: './empty-cart.component.scss'
})
export class EmptyCartComponent {

}
