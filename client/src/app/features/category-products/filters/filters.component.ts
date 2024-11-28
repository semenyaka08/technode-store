import {Component, Input} from '@angular/core';
import {Specification} from '../../../shared/models/specification';
import {FilterItemComponent} from './filter-item/filter-item.component';

@Component({
  selector: 'app-filters',
  imports: [
    FilterItemComponent
  ],
  templateUrl: './filters.component.html',
  standalone: true,
  styleUrl: './filters.component.scss'
})
export class FiltersComponent {
  @Input() filters: Specification[] | undefined;
}
