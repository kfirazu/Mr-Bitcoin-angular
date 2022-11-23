import { formatCurrency } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'transfer-funds',
  templateUrl: './transfer-funds.component.html',
  styleUrls: ['./transfer-funds.component.scss']
})
export class TransferFundsComponent implements OnInit {

  constructor(private userService: UserService) { }

  @Input() contact!: Contact
  amount: number = 0

  ngOnInit(): void {
  }
  //Bug to fix: when clicking transfer- transfer list& preview renders only after refresh
  onTransferFunds(amount: number){
    this.userService.transferFunds(amount, this.contact)
    this.amount = 0
  }

}
