import {Component, inject, Input} from '@angular/core';
import {Specification} from '../../../../shared/models/specification';
import {MatAccordion, MatExpansionPanel, MatExpansionPanelTitle, MatExpansionModule } from '@angular/material/expansion';
import {Router, RouterLink} from '@angular/router';
import {MatIconButton} from '@angular/material/button';

@Component({
  selector: 'app-filter-item',
  imports: [
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionModule,
    RouterLink,
    MatIconButton
  ],
  templateUrl: './filter-item.component.html',
  standalone: true,
  styleUrl: './filter-item.component.scss'
})
export class FilterItemComponent {
  router = inject(Router);

  @Input() specification?: Specification;

  selectedValues: string[] = [];

  onCheckboxChange(value: string, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const isChecked = inputElement.checked;

    if (isChecked) {
      this.selectedValues.push(value);
    } else {
      this.selectedValues = this.selectedValues.filter(v => v !== value);
    }

    const queryParamKey = `filters[${this.specification?.id}]`;

    this.router.navigate([], {
      queryParams: {
        [queryParamKey]: this.selectedValues,
      },
      queryParamsHandling: 'merge'
    });  }
}
