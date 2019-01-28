import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Director } from '../../models/director';
import { Student } from '../../models/student';
import { Club } from '../../models/club';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

declare var M: any;
@Injectable({
  providedIn: 'root'
})
export class DirectorsService {

  selected: Director;
  selectOptions: {};
  directors: Director[];
  students: Student[];
  clubs: Club[];
  ip = window.location.hostname;
  readonly URL_API = environment.baseUrl + "/api/directors";
  readonly URL_STUDENTS = environment.baseUrl + "/api/students";
  readonly URL_CLUBS = environment.baseUrl + "/api/clubs";

  constructor(private router: Router, private http: HttpClient) {
    this.selected = new Director();
  }

  authenticate(loginData) {
    return this.http.post(this.URL_API + "/authenticate", loginData);
  }

  me() {
    return this.http.post(this.URL_API + "/me", {});
  }

  doLogout() {
    this.router.navigate(["/"]);
    window.localStorage.removeItem('token');
  }

  doLogin(form?: NgForm) {
    this.authenticate(form.value)
      .subscribe((res: any) => {
        if (res.success) {
          this.setToken(res.token);
          this.router.navigate(["/clubs"]);
        }
        M.toast({ html: res.message });
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

  getStudents() {
    return this.http.get(this.URL_STUDENTS);
  }

  getClubs() {
    return this.http.get(this.URL_CLUBS);
  }

  get() {
    return this.http.get(this.URL_API);
  }

  post(single: Director) {
    return this.http.post(this.URL_API, single);
  }

  put(single: Director) {
    return this.http.put(this.URL_API + `/${single._id}`, single);
  }

  delete(_id: string) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }

}
