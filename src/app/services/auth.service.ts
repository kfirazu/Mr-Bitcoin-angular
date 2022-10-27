import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private UserService: UserService) { }

  checkLoggedInUser() {
    const user = this.UserService.getUser()
    return !!user
  }
}
