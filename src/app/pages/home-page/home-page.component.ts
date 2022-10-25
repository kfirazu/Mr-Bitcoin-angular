import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { BitcoinService } from '../../services/bitcoin.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private UserService: UserService, private BitcoinService: BitcoinService) { }

  user!: User
  rate!: number

  async ngOnInit(): Promise<void> {
    this.user = this.UserService.getUser()
    const rate = await lastValueFrom(this.BitcoinService.getRate())
    if (rate) this.rate = rate
    console.log('this.rate:', this.rate)
  }
  //renders user name, user balance, btc curr rate

}
