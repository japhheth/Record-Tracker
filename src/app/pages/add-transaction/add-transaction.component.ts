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
    this.btnState = this.authService.transactionForm.value.$key ? 'Modify' : 'Add';
  }


  // ------------------ Prevent letters-----------
  onKeyUp(evt): boolean{
    const charCode = evt.which ? evt.which : evt.keyCode;
    return (charCode > 31 && (charCode < 48 || charCode > 57)) ? false : true;

  }


  // ------------Format amount ----------------
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


  // ------------------Add Transaction---------------
  onAddTransaction(){
    if (this.authService.transactionForm.valid){
        if (this.authService.transactionForm.get('$key').value){
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

  // ---------------- Reset Form input ----------------
  onClose(){
    this.authService.transactionForm.reset();
    this.authService.inititializeFormGroup();
    this.dialogRef.close();
  }

}
