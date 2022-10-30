import { Component, Input, OnInit } from '@angular/core';
import { Transaction } from 'src/app/models/transaction.model';

@Component({
  selector: 'transaction-preview',
  templateUrl: './transaction-preview.component.html',
  styleUrls: ['./transaction-preview.component.scss']
})
export class TransactionPreviewComponent implements OnInit {

  constructor() { }

  @Input() transaction!: Transaction

  ngOnInit(): void {
    console.log('this.transaction:', this.transaction)
  }

}
