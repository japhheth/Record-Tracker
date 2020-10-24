import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TransactionModels} from '../../Models/transactionModels';
import { MatTableDataSource } from '@angular/material/table';
import {AuthServiceService} from '../../service/auth-service.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AddTransactionComponent} from '../add-transaction/add-transaction.component';
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


  constructor(private authService: AuthServiceService, private matDialog: MatDialog) { }

  ngOnInit(){
    this.transactionsFromApi = this.authService.getTranactions()
    .subscribe(list => {
      const array = list.map(item => {
        return{
          $key: item.key,
          ...item.payload.val()
        };
      });
      this.dataSource = new MatTableDataSource(array);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    console.log(this.transactionsFromApi, 'transaction from firebase');
  }


  onSearchClear(){
    this.searchKey = '';
    this.filterSearch();
  }


  filterSearch(){
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }


  onCreate(){
    this.authService.inititializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.matDialog.open(AddTransactionComponent, dialogConfig);
  }

  onEdit(row){
    this.authService.populate(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.matDialog.open(AddTransactionComponent, dialogConfig);
  }

  onDelete($key){

    Swal.fire({
      title: 'Are you sure you want to delete this record ?',
      text: `You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
      }
    });
    //this.authService.deleteTransaction($key);
  }





}
