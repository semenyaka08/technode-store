import { Component } from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {RouterLink} from '@angular/router';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-not-found',
  imports: [
    MatIcon,
    RouterLink,
    MatButton
  ],
  templateUrl: './not-found.component.html',
  standalone: true,
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {

}
