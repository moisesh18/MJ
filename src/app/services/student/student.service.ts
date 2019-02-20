import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Student } from '../../models/student';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class StudentService {
    selected: Student;
    careers: {};
    shirt_size: {};
    columns: {};
    public students: Student[];
    ip = window.location.hostname;
    readonly URL_API = environment.baseUrl + '/api/students';
    constructor(private http: HttpClient) {
        this.shirt_size = [
            {
                "name": "Extra chica",
                "id": "XC"
            },
            {
                "name": "Chica",
                "id": "C"
            },
            {
                "name": "Mediana",
                "id": "M"
            },
            {
                "name": "Grande",
                "id": "G"
            },
            {
                "name": "Extra Grande",
                "id": "XG"
            },
        ];
        this.careers = [
            { "name": "Diseño y comunicacion visual", "faculty": "Artes" },
            { "name": "Arquitectura", "faculty": "Artes" },
            { "name": "Comunicacion y medios", "faculty": "Artes" },
            { "name": "Artes visuales", "faculty": "Artes" },
            { "name": "Preescolar", "faculty": "Educacion" },
            { "name": "Primaria", "faculty": "Educacion" },
            { "name": "Lenguaje y Comunicacion", "faculty": "Educacion" },
            { "name": "Matematicas", "faculty": "Educacion" },
            { "name": "Ciencias Naturales", "faculty": "Educacion" },
            { "name": "Ciencias Sociales", "faculty": "Educacion" },
            { "name": "Ingles", "faculty": "Educacion" },
            { "name": "Contaduria Publica", "faculty": "Empresariales" },
            { "name": "Negocios Internacionales", "faculty": "Empresariales" },
            { "name": "Derecho", "faculty": "Empresariales" },
            { "name": "Musica", "faculty": "Musica" },
            { "name": "Preparatoria", "faculty": "Preparatoria" },
            { "name": "Psicologia Educativa", "faculty": "Psicologia" },
            { "name": "Psicologia Clinica", "faculty": "Psicologia" },
            { "name": "Terapia Fisica", "faculty": "Salud" },
            { "name": "Enfermeria", "faculty": "Salud" },
            { "name": "Clinico Biologo", "faculty": "Salud" },
            { "name": "Médico Cirujano", "faculty": "Salud" },
            { "name": "Nutrición", "faculty": "Salud" },
            { "name": "Cirujano Dentist", "faculty": "Salud" },
            { "name": "Tecnología Dental", "faculty": "Salud" },
            { "name": "Sistemas Computacionales", "faculty": "Ingenieria" },
            { "name": "Electronica", "faculty": "Ingenieria" },
            { "name": "ITIC", "faculty": "Ingenieria" },
            { "name": "IGTIC", "faculty": "Ingenieria" },
            { "name": "Industrial y de Sistemas", "faculty": "Ingenieria" },
            { "name": "Teologia", "faculty": "Teologia" },
            { "name": "Otras", "faculty": "Otras" }
        ];
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
        this.selected = new Student();
    }

    get() {
        return this.http.get(this.URL_API);
    }

    post(Student: Student) {
        return this.http.post(this.URL_API, Student);
    }

    put(student: Student) {
        return this.http.put(this.URL_API + `/${student._id}`, student);
    }

    delete(_id: string) {
        return this.http.delete(this.URL_API + `/${_id}`);
    }
}
