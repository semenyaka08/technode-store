import {Component, inject, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {OrdersComponent} from './orders/orders.component';

@Component({
  selector: 'app-admin',
  imports: [
    MatTable,
    MatTabGroup,
    MatTab,
    OrdersComponent
  ],
  templateUrl: './admin.component.html',
  standalone: true,
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

}
