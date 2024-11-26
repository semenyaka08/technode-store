import {Component, Input} from '@angular/core';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatDivider} from '@angular/material/divider';
import {MatIcon} from '@angular/material/icon';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-filter',
  imports: [
    MatOption,
    MatSelect,
    FormsModule,
    MatButton,
    MatDivider,
    MatIcon,
    NgClass
  ],
  templateUrl: './filter.component.html',
  standalone: true,
  styleUrl: './filter.component.scss'
})
export class FilterComponent {

  isBrandsOpen = false;
  @Input() filterName?: string;
  @Input() availableOptions: string[] = [];

  toggleBrands() {
    this.isBrandsOpen = !this.isBrandsOpen;
  }
}
