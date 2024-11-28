import {Component, Input} from '@angular/core';
import {Specification} from '../../../../shared/models/specification';

@Component({
  selector: 'app-filter-item',
  imports: [],
  templateUrl: './filter-item.component.html',
  standalone: true,
  styleUrl: './filter-item.component.scss'
})
export class FilterItemComponent {
  @Input() filter?: Specification;
}
