import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from '../../service/auth-service.service';
import {MatDialogRef} from '@angular/material/dialog';
import {NotificationService} from '../../shared/notification.service';


@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss']
})
export class AddTransactionComponent implements OnInit {
  btnState: any;
  constructor(public authService: AuthServiceService,
              private dialogRef: MatDialogRef<AddTransactionComponent>,
              public notificationService: NotificationService) { }

  ngOnInit() {
    console.log(this.authService.transactionForm.value.$key, 'key');
    this.btnState = this.authService.transactionForm.value.$key ? 'Modify' : 'Add';

  }


  onKeyUp(evt): boolean{
    console.log(evt, 'evt');
    const charCode = evt.which ? evt.which : evt.keyCode;
    return (charCode > 31 && (charCode < 48 || charCode > 57)) ? false : true;

  }


  formatAmount(evt) {
    const amtVal = evt.value;
    if (amtVal) {
      let amt = amtVal.replace(/,/g, '');
      amt = amt.replace(/[&\/\\#,+()$~%'":*?<>{}-]/g, '');
      amt = amt.replace(/[^\d.]/g, '');
      amt = amt.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      this.authService.transactionForm.patchValue({amount : amt});

    }
  }

  onAddTransaction(){
    console.log(this.authService.transactionForm.value, 'transaction');
    if (this.authService.transactionForm.valid){
        if (this.authService.transactionForm.get('$key').value){
            console.log('updating');
            this.authService.updateTransaction(this.authService.transactionForm.value);
            this.notificationService.success(':: Updated successfully');
            this.authService.transactionForm.reset();
            this.onClose();
        }
        else{
          this.authService.addTransaction(this.authService.transactionForm.value);
          this.authService.transactionForm.reset();
          this.notificationService.success(':: Submitted successfully');
          this.onClose();
        }
    }
  }

  onClose(){
    this.authService.transactionForm.reset();
    this.authService.inititializeFormGroup();
    this.dialogRef.close();
  }

}
