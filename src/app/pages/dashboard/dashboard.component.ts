import { Component, OnInit } from '@angular/core';
import { BitcoinService } from 'src/app/services/bitcoin.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private bitcoinService: BitcoinService) { }

  marketPriceHistory: object | null = null
  priceHistoryLabels: string[] = []
  priceHistoryData: Array<number> = []
  priceHistoryDescription: string = ''

  async ngOnInit(): Promise<void> {
    const marketPriceHistory = await lastValueFrom(this.bitcoinService.getMarketPriceHistory())
    this.marketPriceHistory = marketPriceHistory
    this.priceHistoryDescription = marketPriceHistory.description
    this.priceHistoryLabels = (this.marketPriceHistory as { values: { x: string }[] }).values.map((value) => value.x)
    this.priceHistoryData = (this.marketPriceHistory as {values: Array<{y: number}>}).values.map((value) => value.y)
  }

}
