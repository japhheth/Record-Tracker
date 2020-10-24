import { DatePipe } from '@angular/common';
import { Injectable, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {AngularFireList, AngularFireDatabase} from 'angularfire2/database';
import {TransactionModels} from '../Models/transactionModels';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  transactionList: AngularFireList<any>;
  arrayList: any;
  constructor(private firebase: AngularFireDatabase, private pipe: DatePipe) { }

  transactionForm: FormGroup = new FormGroup({
    $key: new FormControl(null),
    transactionDate: new FormControl('', [Validators.required]),
    payeeName: new FormControl('', Validators.required),
    amount: new FormControl('', [Validators.required]),
    memo: new FormControl('')
  });

  inititializeFormGroup(){
    this.transactionForm.setValue({
      $key: null,
      transactionDate: '',
      payeeName: '',
      amount: '',
      memo: ''

    });
  }

  getTranactions(){
    this.transactionList = this.firebase.list('transactions');
    return this.transactionList.snapshotChanges();
  }

  addTransaction(transaction: TransactionModels){
    console.log(transaction, 'this is the api');
    console.log(typeof(transaction.transactionDate));
    this.transactionList = this.firebase.list('/transactions');
    if  (this.transactionList){
          this.transactionList.push({
          transactionDate: transaction.transactionDate === '' ? '' : this.pipe.transform(transaction.transactionDate, 'yyyy-MM-dd'),
          payeeName: transaction.payeeName,
          amount: transaction.amount,
          memo: transaction.memo

      });
    }
  }

  updateTransaction(transaction){
      this.transactionList.update(transaction.$key, {
        transactionDate: transaction.transactionDate === '' ? '' : this.pipe.transform(transaction.transactionDate, 'yyyy-MM-dd'),
        payeeName: transaction.payeeName,
        amount: transaction.amount,
        memo: transaction.memo
      });
  }

  deleteTransaction($key: string){
    this.transactionList.remove($key);
  }

  populate(transactionData){
    this.transactionForm.setValue(transactionData);



  }


}
