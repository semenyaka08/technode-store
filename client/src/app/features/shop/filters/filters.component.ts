import {Component, EventEmitter, Input, Output} from '@angular/core';
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
  @Output() filterChange = new EventEmitter<{ filter: Specification, selectedValues: string[] }[]>();

  selectedFilters: { filter: Specification, selectedValues: string[] }[] = [];

  onFilterChange(event: { filter: Specification, selectedValues: string[] }) {
    const existingFilter = this.selectedFilters.find(f => f.filter.id === event.filter.id);
    if (existingFilter) {
      existingFilter.selectedValues = event.selectedValues;
    } else {
      this.selectedFilters.push(event);
    }
    console.log('Selected Filters:', this.selectedFilters);

    this.filterChange.emit(this.selectedFilters);
  }
}
