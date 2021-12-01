import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from '../shared/layouts/services/user-service.service';
import { User } from '../shared/interfaces';
import { AlertifyService } from '../shared/layouts/services/alertify.service';
import * as alertyfy from 'alertifyjs';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  registrationForm: FormGroup;
  user: User;
  userSubmitted: boolean;



  constructor(
    private fb: FormBuilder,
    private userService: UserServiceService,
    private alertify: AlertifyService,
    private router: Router
    ) {

    }

  ngOnInit(): void {
    // this.registrationForm = new FormGroup({
    //   email: new FormControl(null, [Validators.required, Validators.email]),
    //   password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    // });
    this.createRegistrationForm();
  }

  createRegistrationForm() {
      this.registrationForm = this.fb.group({
        email: [null, Validators.required],
        password: [null, [Validators.required, Validators.minLength(6)]]
      })
  }

  get email() {
    return this.registrationForm.get('email') as FormControl;
  }

  get password() {
    return this.registrationForm.get('password') as FormControl;
  }



  onSubmit(): void {
    console.log(this.registrationForm.value);
    this.userSubmitted = true;
    if(this.registrationForm.valid) {
    // this.user =  Object.assign(this.user, this.registrationForm.value);
    this.userService.addUser(this.userData());
    this.registrationForm.reset();
    this.userSubmitted = false;
    alertyfy.success('Вы успешно зарегистрировались!');
    this.router.navigate(['/login']);
    } else {
    alertyfy.error('Пожалуйста, заполните обязательные поля!')
    }
  }

  userData(): User {
    return this.user = {
      email: this.email.value,
      password: this.password.value
    }
  }
}
