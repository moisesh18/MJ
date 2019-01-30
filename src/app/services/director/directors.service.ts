import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Director } from '../../models/director';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

declare var M: any;
@Injectable({
    providedIn: 'root'
})
export class DirectorsService {
    selected: Director;
    ip = window.location.hostname;
    readonly URL_API = environment.baseUrl + "/api/directors";
    readonly URL_STUDENTS = environment.baseUrl + "/api/students";
    readonly URL_CLUBS = environment.baseUrl + "/api/clubs";

    constructor(private router: Router, private http: HttpClient) {
        this.selected = new Director();
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
