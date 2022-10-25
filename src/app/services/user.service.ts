import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() { }


  public getUser() {
   const user: User = {
      name: 'Daniel Sundgren',
      balance: 100,
      transactions: []
    }
    return user
  }

}

