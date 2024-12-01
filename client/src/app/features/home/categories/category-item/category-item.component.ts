import {Component, Input} from '@angular/core';
import {MatListItem} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';
import {Category} from '../../../../shared/models/category';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-category-item',
  imports: [
    MatListItem,
    MatIcon,
    RouterLink
  ],
  templateUrl: './category-item.component.html',
  standalone: true,
  styleUrl: './category-item.component.scss'
})
export class CategoryItemComponent {
  @Input() category?: Category;
}
