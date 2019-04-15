import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Director } from '../../models/director';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs'

declare var $: any;

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  selected: Director;
  user: Director = new Director;
  ip = window.location.hostname;
  readonly URL_API = environment.baseUrl + "/api/directors";
  readonly URL_students = environment.baseUrl + "/api/students";
  readonly URL_CLUBS = environment.baseUrl + "/api/clubs";

  constructor(private router: Router, private http: HttpClient) {
    this.selected = new Director();
  }

  authenticate(loginData) {
    return this.http.post(this.URL_API + "/authenticate", loginData);
  }

  toast(message, autohide?) {
    var toast = document.getElementById("snackbar");
    toast.className = "show";
    toast.innerHTML = message;
    setTimeout(function () { toast.className = toast.className.replace("show", ""); }, 8000);
  }

  CurrentUser(): Observable<Director> {
    return this.http.post<Director>(this.URL_API + "/me", {});
  }


  get gisAdmin() {
    return this.user && this.user.role === "admin";
  }

  get gisDirector() {
    return this.user && this.user.role === "director" || this.gisAdmin;
  }

  get gisSecretary() {
    return this.user && this.user.role === "secretario" || this.gisDirector;
  }

  get iAm() {
    return this.user.role;
  }

  doLogout() {
    this.router.navigate(["/"]);
    window.localStorage.removeItem('token');
    this.user = undefined;
  }

  doLogin(form?: NgForm) {
    this.authenticate(form.value)
      .subscribe((res: any) => {
        if (res.success) {
          this.user = res.user;
          this.setToken(res.token);
          this.router.navigate(["/clubs"]);
        }
        this.toast(res.message, true)
      });
  }

  setToken(token) {
    window.localStorage.setItem('token', token);
  }

  removeToken() {
    window.localStorage.removeItem('token');
  }

  isLoggedIn() {
    return !!window.localStorage.getItem('token');
  }

  getToken() {
    return window.localStorage.getItem('token');
  }

}

