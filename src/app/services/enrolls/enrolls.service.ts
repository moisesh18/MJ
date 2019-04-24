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
    columns: {};
    ip = window.location.hostname;
    readonly URL_API = environment.baseUrl + '/api/enrolls';
    readonly URL_STUDENTS = environment.baseUrl + '/api/students';
    readonly URL_CLUBS = environment.baseUrl + '/api/clubs';
    readonly URL_CYCLES = environment.baseUrl + '/api/cycles';
    constructor(private http: HttpClient) {
        this.selected = new Enroll();

        this.columns = [
        [{
            title: 'Matricula',
            field: 'student._id',
            sortable: true
        },
        {
            title: 'Nombre',
            field: 'student.fullName',
            sortable: true
        },
        {
            title: 'Carrera',
            field: 'student.career',
            sortable: true
        },
        {
            title: 'Año',
            field: 'student.career_year',
            sortable: true
        },
        {
            title: 'Fecha de nacimiento',
            field: 'student.birthday',
            sortable: true,
            visible: false
        },
        {
            title: 'Email',
            field: 'student.email',
            sortable: true,
            visible: false
        },
        {
            title: 'Telefono',
            field: 'student.phone',
            sortable: true,
            visible: false
        },
        {
            title: 'Talla',
            field: 'student.shirt_size',
            sortable: true,
            visible: false
        },
        {
            title: 'Interno',
            field: 'student.resident',
            sortable: true
        },
        {
            title: 'Residencia',
            field: 'student.residence',
            sortable: true
        },
        {
            title: 'Desayuno',
            field: 'student.breakfast',
            sortable: true,
            visible: false
        },
        {
            title: 'Comida',
            field: 'student.lunch',
            sortable: true,
            visible: false
        },
        {
            title: 'Cena',
            field: 'student.dinner',
            sortable: true,
            visible: false
        },
        {
            title: 'Tipo de sangre',
            field: 'student.blood_type',
            sortable: true,
            visible: false
        },
        {
            title: 'Medicinas',
            field: 'student.drugs',
            sortable: true,
            visible: false
        },
        {
            title: 'Alergias',
            field: 'student.allergy',
            sortable: true,
            visible: false
        },
        {
            title: 'Cirugias recientes',
            field: 'student.recent_illness',
            sortable: true,
            visible: false
        },
        {
            title: 'Bautizado',
            field: 'student.baptized',
            sortable: true,
            visible: false
        },
        {
            title: 'Religion',
            field: 'student.religion',
            sortable: true,
            visible: false
        },
        {
            title: 'Mexicano',
            field: 'student.mexican',
            sortable: true,
            visible: false
        },
        {
            title: 'Telefono de emergencia',
            field: 'student.emergency_phone',
            sortable: true,
            visible: false
        }]
        ];

    }

    get() {
        return this.http.get(this.URL_API);
    }

    getClubs() {
        return this.http.get(this.URL_CLUBS);
    }

    getEnrolls() {
        return this.http.get(this.URL_API + `/enrolls`);
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
