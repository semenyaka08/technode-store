import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from '@angular/material/table';
import {CurrencyPipe, DatePipe} from '@angular/common';
import {MatTooltip} from '@angular/material/tooltip';
import {MatIconButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {MatPaginator} from '@angular/material/paginator';
import {Order} from '../../../shared/models/order';
import {AdminService} from '../../../core/services/admin.service';
import {OrdersParameters} from '../../../shared/models/ordersParameters';
import {PageResult} from '../../../shared/models/page-result';

@Component({
  selector: 'app-admin-orders',
  imports: [
    MatLabel,
    MatFormField,
    MatSelect,
    MatOption,
    MatTable,
    MatHeaderCell,
    MatCell,
    MatColumnDef,
    MatCellDef,
    MatHeaderCellDef,
    CurrencyPipe,
    DatePipe,
    MatTooltip,
    MatIconButton,
    RouterLink,
    MatIcon,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatPaginator
  ],
  templateUrl: './orders.component.html',
  standalone: true,
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['id', 'buyerEmail', 'orderStatus', 'total', 'orderCreated'];
  dataSource = new MatTableDataSource<Order>([]);
  adminService = inject(AdminService);
  statusOptions = ['Pending', 'PaymentReceived', 'PaymentFailed', 'PaymentMissMatch'];
  orderParams: OrdersParameters = {
    selectedSort: {sortBy: 'amount', sortDirection: 'desc'},
    paginationParams: {pageNumber: 1, pageSize: 12},
  };
  pageResult!: PageResult<Order>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.adminService.getAllOrders(this.orderParams).subscribe({
      next: (data) => {this.pageResult = data; this.dataSource.data = data.items;},
      error: (err) => {console.log(err)}
    });
  }

  onPageChange(event: any) {
    this.orderParams.paginationParams!.pageNumber = event.pageIndex + 1;
    this.orderParams.paginationParams!.pageSize = event.pageSize;
    this.loadOrders();
  }

  onStatusSelect(event: any){
    this.orderParams.orderStatus = event.value;
    this.loadOrders();
  }
}
