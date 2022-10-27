import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private UserService: UserService, private router: Router) { }

username: string = ''

  ngOnInit(): void {
    
  }

  onSubmit(form: NgForm) {
    this.UserService.loginSignUp(form.value.username)
    this.router.navigate([''])
  }

}
