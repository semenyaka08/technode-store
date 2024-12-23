import {Component} from '@angular/core';
import {MatTable} from '@angular/material/table';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {OrdersComponent} from './orders/orders.component';
import {CatalogComponent} from './catalog/catalog.component';

@Component({
  selector: 'app-admin',
  imports: [
    MatTable,
    MatTabGroup,
    MatTab,
    OrdersComponent,
    CatalogComponent
  ],
  templateUrl: './admin.component.html',
  standalone: true,
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

}
