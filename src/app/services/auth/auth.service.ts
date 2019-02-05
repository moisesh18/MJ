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
    miprueba: string = 'test2';
    selected: Director;
    user: any;
    ip = window.location.hostname;
    readonly URL_API = environment.baseUrl + "/api/directors";
    readonly URL_students = environment.baseUrl + "/api/students";
    readonly URL_CLUBS = environment.baseUrl + "/api/clubs";

    constructor(private router: Router, private http: HttpClient) {
        this.selected = new Director();
        this.user = new Director();
        // if (!this.user) {
        //     this.CurrentUser();
        // }
    }

    authenticate(loginData) {
        return this.http.post(this.URL_API + "/authenticate", loginData);
    }

    async CurrentUser() {
        return await this.http.post(this.URL_API + "/me", {}).toPromise().then(
            res => { this.user = res; }
        );
    }

    isAdmin() {
        return this.user.role == "admin"
    }

    isDirector() {
        return this.user.role == "director" || this.isAdmin()
    }

    isSecretary() {
        return this.user.role == "secretario" || this.isDirector()
    }

    isTreasurer() {
        return this.user.role == "tesorero" || this.isSecretary()
    }

    isUser() {
        return this.user.role == "usuario" || this.isTreasurer()
    }

    soy() {
        return this.user.role
    }

    doLogout() {
        this.router.navigate(["/"]);
        window.localStorage.removeItem('token');
        this.user = false;
    }

    doLogin(form?: NgForm) {
        this.authenticate(form.value)
            .subscribe((res: any) => {
                if (res.success) {
                    this.user = res.user;
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

