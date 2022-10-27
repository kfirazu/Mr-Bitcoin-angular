import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, of } from 'rxjs';
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

}
