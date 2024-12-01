import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Specification} from '../../../../shared/models/specification';
import {MatAccordion, MatExpansionPanel, MatExpansionPanelTitle, MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-filter-item',
  imports: [
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionModule
  ],
  templateUrl: './filter-item.component.html',
  standalone: true,
  styleUrl: './filter-item.component.scss'
})
export class FilterItemComponent {
  @Input() specification?: Specification;
  @Output() filterChange = new EventEmitter<{ filter: Specification, selectedValues: string[] }>();

  selectedValues: string[] = [];

  onCheckboxChange(value: string, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const isChecked = inputElement.checked;

    if (isChecked) {
      this.selectedValues.push(value);
    } else {
      this.selectedValues = this.selectedValues.filter(v => v !== value);
    }
    this.filterChange.emit({ filter: this.specification!, selectedValues: this.selectedValues });
  }
}
