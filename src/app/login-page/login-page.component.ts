import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/layouts/services/auth.service';
import { AlertifyService } from '../shared/layouts/services/alertify.service';
import * as alertyfy from 'alertifyjs';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup;

  isLoggedIn : boolean;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private alertify: AlertifyService
  ) {

  }



  ngOnInit(): void {
     this.loginForm = this.fb.group({
       email: ['', [Validators.required, Validators.email]],
       password: ['', [Validators.required, Validators.minLength(6)]]
     });


  }


  onLogin(): void {
    console.log(this.loginForm.value);
    const token = this.authService.authUser(this.loginForm.value);
    if (token) {
      localStorage.setItem('token', token.email);
      alertyfy.success('Вы успешно авторизовались!');
      this.router.navigate(['/overview']);
    } else {
      alertyfy.error('Введён неверный Email или Пароль');
    }
  }

}
