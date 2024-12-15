import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-checkout-success',
  imports: [
    RouterLink,
    MatButton
  ],
  templateUrl: './checkout-success.component.html',
  standalone: true,
  styleUrl: './checkout-success.component.scss'
})
export class CheckoutSuccessComponent {

}
