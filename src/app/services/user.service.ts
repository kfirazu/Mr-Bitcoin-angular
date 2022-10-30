import { Inject, inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { StorageService } from './storage.service';
import { UtilService } from './util.service';
import { ContactService } from 'src/app/services/contact.service';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private storageService: StorageService, private contactService: ContactService) { }
  // storageService = Inject(storageService)

  private KEY = 'userDB'
  // private _user!: User
  // private _user$ = new BehaviorSubject<User>(storageService.loadFromStorage(this.KEY) || null)
  // public user$ = this._user$.asObservable()


  // public getUser() {
  //   const user: User = {
  //     name: 'Daniel Sundgren',
  //     balance: 100,
  //     transactions: []
  //   }
  //   return user
  // }
  public getUser() {
    return this.storageService.loadFromStorage('loggedInUser') || null
  }

  public loginSignUp(username: string) {
    const users = this.storageService.loadFromStorage(this.KEY) || []
    const userIdx = users.findIndex((user: { name: string; }) => user.name === username)

    if (userIdx !== -1) {
      const user = users[userIdx]
      this.storageService.saveToStorage('loggedInUser', user)
      return user
    }
    const user: User = {
      _id: this.contactService.getRandomId(),
      name: username,
      balance: 100,
      transactions: []
    }

    users.push(user)
    this.storageService.saveToStorage('loggedInUser', user)
    this.storageService.saveToStorage(this.KEY, users)
    return user
  }

  public logout() {
    this.storageService.saveToStorage('loggedInUser', null)
  }

  public transferFunds(amount: number, contact: Contact) {
    const user = this.getUser()
    user.balance -= amount

    const transaction = {
      id: this.contactService.getRandomId(),
      toId: contact._id,
      to: contact.name,
      at: Date.now(),
      amount
    }

    user.transactions.unshift(transaction)
    this.storageService.saveToStorage('loggedInUser', user)
  }

}

