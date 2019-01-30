import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Director } from '../../models/director';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

declare var M: any;
@Injectable({
    providedIn: 'root'
})

export class AuthService {
    selected: Director;
    user: any;
    ip = window.location.hostname;
    readonly URL_API = environment.baseUrl + "/api/directors";
    readonly URL_students = environment.baseUrl + "/api/students";
    readonly URL_CLUBS = environment.baseUrl + "/api/clubs";

    constructor(private router: Router, private http: HttpClient) {
        this.selected = new Director();
        this.user = new Director();
    }

    authenticate(loginData) {
        return this.http.post(this.URL_API + "/authenticate", loginData);
    }

    me() {
        return this.http.post(this.URL_API + "/me", {});
    }

    async CurrentUser() {
        return this.http.post(this.URL_API + "/me", {}).toPromise().then(
            res => { this.user = res; }
        );
    }

    isAdmin() {
        if (this.user.job == "admin") {
            return true;
        } else {
            return false;
        }
    }

    isDirector() {
        if (this.user.job == "director") {
            return true;
        } else {
            return false;
        }
    }

    isSecretary() {
        if (this.user.job == "secretario") {
            return true;
        } else {
            return false;
        }
    }

    isTreasurer() {
        if (this.user.job == "tesorero") {
            return true;
        } else {
            return false;
        }
    }

    isUser() {
        if (this.user.job == "inscripciones") {
            return true;
        } else {
            return false;
        }
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

}

