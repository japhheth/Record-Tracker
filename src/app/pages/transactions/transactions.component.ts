import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TransactionModels} from '../../Models/transactionModels';
import { MatTableDataSource } from '@angular/material/table';
import {AuthServiceService} from '../../service/auth-service.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AddTransactionComponent} from '../add-transaction/add-transaction.component';
import {NotificationService} from '../../shared/notification.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  transactionsFromApi: any;
  searchKey: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['transactionDate', 'payeeName', 'amount', 'memo', 'actions'];
  dataSource: MatTableDataSource<TransactionModels>;
  closeResult: string;


  constructor(private authService: AuthServiceService, private matDialog: MatDialog, public notificationService: NotificationService) { }

  ngOnInit(){

    // ---------- Get transactions -----------------------

    this.transactionsFromApi = this.authService.getTranactions()
    .subscribe(list => {
          const array = list.map(item => {
            return {
              $key: item.key,
              ...item.payload.val()
            };
          });
          this.dataSource = new MatTableDataSource(array);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
    });
  }


  // ----------------- Clear search -------------------

  onSearchClear(){
    this.searchKey = '';
    this.filterSearch();
  }


  // ----------------- filter search ------------------
  filterSearch(){
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  // ----------- Initialize transaction ---------------
  onCreate(){
    this.authService.inititializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.matDialog.open(AddTransactionComponent, dialogConfig);
  }

  // ------------- Modify Transaction record ------
  onEdit(row){
    this.authService.populate(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.matDialog.open(AddTransactionComponent, dialogConfig);
  }

  // ----------------Delete record -------------------
  onDelete($key){

    Swal.fire({
      title: 'Are you sure you want to delete this record ?',
      text: `You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#14141F',
      cancelButtonColor: ' #f44336',
      confirmButtonText: 'Yes, delete it!',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.deleteTransaction($key);
        this.notificationService.success(':: Deleted successfully');
      }
    });
  }





}
