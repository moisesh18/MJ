import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Enroll } from '../../models/enroll';
import { Student } from '../../models/student';
import { Club } from '../../models/club';
import { Cycle } from '../../models/cycle';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EnrollsService {
    selected: Enroll;
    selectOptions: {};
    plural: Enroll[];
    students: Student[];
    clubs: Club[];
    cycles: Cycle[];
    ip = window.location.hostname;
    readonly URL_API = environment.baseUrl + '/api/enrolls';
    readonly URL_STUDENTS = environment.baseUrl + '/api/students';
    readonly URL_CLUBS = environment.baseUrl + '/api/clubs';
    readonly URL_CYCLES = environment.baseUrl + '/api/cycles';
    constructor(private http: HttpClient) {
        this.selected = new Enroll();
    }

    get() {
        return this.http.get(this.URL_API);
    }

    getClubs() {
        return this.http.get(this.URL_CLUBS);
    }

    getEnrolls(_id: String) {
        return this.http.get(this.URL_API + `/${_id}/enrolls`);
    }

    getStudents() {
        return this.http.get(this.URL_STUDENTS);
    }

    getCycles() {
        return this.http.get(this.URL_CYCLES);
    }

    post(single: Enroll) {
        return this.http.post(this.URL_API, single);
    }


    put(single: Enroll) {
        return this.http.put(this.URL_API + `/${single._id}`, single);
    }

    delete(_id: string) {
        return this.http.delete(this.URL_API + `/${_id}`);
    }
}
