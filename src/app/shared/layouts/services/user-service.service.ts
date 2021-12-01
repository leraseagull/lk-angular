import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../interfaces';
import { UserComponent } from '../user/user.component';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {


  constructor(
    private http: HttpClient
  ) {

   }


  addUser(user: User) {
    let users = [];
    if (localStorage.getItem('Users')) {
      users = JSON.parse(localStorage.getItem('Users'));
      users = [user, ...users];
    } else {
      users = [user];
    }
    localStorage.setItem('Users', JSON.stringify(users));
  }
}
