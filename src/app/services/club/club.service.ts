import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Club } from '../../models/club';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ClubService {
    selected: Club;
    selectOptions: {};
    plural: Club[];
    columns: {};
    ip = window.location.hostname;
    readonly URL_API = environment.baseUrl + "/api/clubs";
    constructor(private http: HttpClient) {
        this.selected = new Club();
        this.columns = [
            [{
                title: 'ID',
                field: '_id',
                sortable: true
            }, {
                title: 'Nombre',
                field: 'name',
                sortable: true
            },
            {
                title: 'Costo de inscripcion',
                field: 'fees',
                sortable: true
            },
            {
                title: 'Tipo',
                field: 'type',
                sortable: true
            }]
        ];

    }

    get() {
        return this.http.get(this.URL_API);
    }

    getDirectors(_id: String) {
        return this.http.get(this.URL_API + `/${_id}/directors`);
    }

    getEnrolls() {
        return this.http.get(this.URL_API + "/enrolls");
    }

    post(single: Club) {
        return this.http.post(this.URL_API, single);
    }

    put(single: Club) {
        return this.http.put(this.URL_API + `/${single._id}`, single);
    }

    delete(_id: string) {
        return this.http.delete(this.URL_API + `/${_id}`);
    }

}
