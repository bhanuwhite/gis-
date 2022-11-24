import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// @ts-ignore
import Notiflix from 'notiflix';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  isOtpLogin: boolean = true;
  loginForm = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {}
  openOtpLogin() {
    this.isOtpLogin = !this.isOtpLogin;
  }
  signinForm() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.valid);
      if (
        this.loginForm.value.email == 'admin' &&
        this.loginForm.value.password == 'admin'
      ) {
        Notiflix.Notify.success('Login Successfully');
        this.router.navigate(['/map']);
        sessionStorage.setItem('token', 'admin%admin');
      } else {
        Notiflix.Notify.failure('Invalid user ID or password');
        this.loginForm.reset();
      }
    } else {
      Notiflix.Notify.warning('Please Fill up Mandetory Field');
    }
  }
}
