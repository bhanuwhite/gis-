import { getLocaleDirection } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// @ts-ignore
import Notiflix from 'notiflix';
import { HeaderServiceService } from '../module/header-service.service';
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
  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private heaaderservice: HeaderServiceService
  ) {}

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
        this.getLocalLocation();
        Notiflix.Loading.standard();
        //
      } else {
        Notiflix.Notify.failure('Invalid user ID or password');
        this.loginForm.reset();
      }
    } else {
      Notiflix.Notify.warning('Please Fill up Mandetory Field');
    }
  }
  async getLocalLocation() {
    await navigator.geolocation.getCurrentPosition(this.position, this.error);
    sessionStorage.setItem('token', 'admin%admin');
    setTimeout(() => {
      Notiflix.Loading.remove();
      Notiflix.Notify.success('Login Successfully');
      this.router.navigate(['/map']);
    }, 4000);
  }
  position(cord: any) {
    let cordinate: any = [cord.coords.longitude, cord.coords.latitude];
    sessionStorage.setItem('cordnate', JSON.stringify(cordinate));

    // this.heaaderservice.sendCoordinatepoint(cordinate);
    console.log(cord.coords.longitude);
  }
  error(err: any) {
    console.log(err.PERMISSION_DENIED);
    if (err.PERMISSION_DENIED) {
      let cordinate: any = [86.528876, 21.5152];
      sessionStorage.setItem('cordnate', JSON.stringify(cordinate));
      Notiflix.Notify.warning('denied the request for geolocation');
    }
  }
}
