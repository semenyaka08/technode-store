import {Component, Input} from '@angular/core';
import {MatListItem} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';
import {CategoryModel} from '../../../../shared/models/category-model';

@Component({
  selector: 'app-category-item',
  imports: [
    MatListItem,
    MatIcon
  ],
  templateUrl: './category-item.component.html',
  standalone: true,
  styleUrl: './category-item.component.scss'
})
export class CategoryItemComponent {
  @Input() category?: CategoryModel;
}
