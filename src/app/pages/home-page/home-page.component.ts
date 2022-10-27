import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { BitcoinService } from '../../services/bitcoin.service';
import { lastValueFrom, Subscription } from 'rxjs';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {

  constructor(private UserService: UserService, private BitcoinService: BitcoinService) { }

  user: User = {} as User
  rate!: number
  // userSubscriber!: Subscription

  async ngOnInit(): Promise<void> {
    this.user = this.UserService.getUser()
    // this.userSubscriber = this.UserService.user$.subscribe(user => this.user = user)
    const rate = await lastValueFrom(this.BitcoinService.getRate())
    if (rate) this.rate = rate

  }

  ngOnDestroy(): void {
    // this.userSubscriber.unsubscribe()
  }

}
