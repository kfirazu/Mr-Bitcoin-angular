import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, of, tap } from 'rxjs';
import { StorageService } from './storage.service';


@Injectable({
  providedIn: 'root'
})
export class BitcoinService {

  KEY: string = 'rateDB'

  constructor(private http: HttpClient, private storageService: StorageService) { }

  public getRate() {
    let btcRate = this.storageService.loadFromStorage(this.KEY)
    // console.log('btcRate:', btcRate)
    // if (btcRate) {
    //   console.log('From storage')
    //   return of(btcRate)
    // }
    const result = this.http.get<{ USD: any }>('https://blockchain.info/ticker')
      .pipe(
        map((res) => res.USD.last)
      )
    btcRate = result

    this.storageService.saveToStorage(this.KEY, btcRate)
    return result
  }

  public getMarketPriceHistory() {
    const priceHistoryFromStorage = this.storageService.loadFromStorage('market-price-history')
    if (priceHistoryFromStorage)
      return of(priceHistoryFromStorage)
    else {
      const priceHistory = this.http.get('https://api.blockchain.info/charts/market-price?timespan=12months&format=json&cors=true')
        .pipe(
          map((res) => {
            const cleanPriceHistoryMap = {
              name: (res as { name: string }).name,
              unit: (res as { unit: string }).unit,
              description: (res as { description: string }).description,
              values: (res as { values: Array<{ x: number, y: number }> }).values.map(value => {
                const date = (new Date(value.x * 1000)).toLocaleDateString("en-US")
                return {
                  x: date,
                  y: value.y
                }
              })
            }
            this.storageService.saveToStorage('market-price-history', cleanPriceHistoryMap)
            return cleanPriceHistoryMap
          })
        )
      return priceHistory
    }
  }
}
