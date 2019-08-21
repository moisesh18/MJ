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
            { "name": "Diseño y comunicacion visual", "faculty": "ARTCOM" },
            { "name": "Arquitectura", "faculty": "ARTCOM" },
            { "name": "Comunicacion y medios", "faculty": "ARTCOM" },
            { "name": "Artes visuales", "faculty": "ARTCOM" },
            { "name": "Preescolar", "faculty": "FACED" },
            { "name": "Primaria", "faculty": "FACED" },
            { "name": "Lenguaje y Comunicacion", "faculty": "FACED" },
            { "name": "Matematicas", "faculty": "FACED" },
            { "name": "Ciencias Naturales", "faculty": "FACED" },
            { "name": "Ciencias Sociales", "faculty": "FACED" },
            { "name": "Ingles", "faculty": "FACED" },
            { "name": "Especialidad en Docencia", "faculty": "FACED" },
            { "name": "Especialidad en Diseño e Innovación Curricular", "faculty": "FACED" },
            { "name": "Especialidad en Educación en Línea", "faculty": "FACED" },
            { "name": "Especialidad en Recursos Tecnológicos", "faculty": "FACED" },
            { "name": "Especialidad en Liderazgo y Gestipon Educativa", "faculty": "FACED" },
            { "name": "Maestría en Gestión Docente", "faculty": "FACED" },
            { "name": "Maestría en Gestion Curricular", "faculty": "FACED" },
            { "name": "Maestría en Gestion Educativa", "faculty": "FACED" },
            { "name": "Maestría en Tecnología Educativa", "faculty": "FACED" },
            { "name": "Doctorado en Educación", "faculty": "FACED" },
            { "name": "Contaduria Publica", "faculty": "FACEJ" },
            { "name": "Negocios Internacionales", "faculty": "FACEJ" },
            { "name": "Derecho", "faculty": "FACEJ" },
            { "name": "Especialidad en Gestión de Capital Humano", "faculty": "FACEJ" },
            { "name": "Especialidad en Finanzas", "faculty": "FACEJ" },
            { "name": "Especialidad en Mercadotecnia", "faculty": "FACEJ" },
            { "name": "Especialidad en Administración de Negocios", "faculty": "FACEJ" },
            { "name": "Maestría en Finanzas", "faculty": "FACEJ" },
            { "name": "Maestría en Gestión de Capital Humano", "faculty": "FACEJ" },
            { "name": "Maestría en Mercadotecnia", "faculty": "FACEJ" },
            { "name": "Maestría en Administración de Negocios", "faculty": "FACEJ" },
            { "name": "Doctorado en Administración de Negocios", "faculty": "FACEJ" },
            { "name": "Musica", "faculty": "ESMUS" },
            { "name": "Preparatoria", "faculty": "Preparatoria" },
            { "name": "Psicologia Educativa", "faculty": "FAPSI" },
            { "name": "Psicologia Clinica", "faculty": "FAPSI" },
            { "name": "Especialidad en Intervención en Crisis", "faculty": "FAPSI" },
            { "name": "Especialidad en Terapia Familiar", "faculty": "FAPSI" },
            { "name": "Maestría en Consejería Familiar", "faculty": "FAPSI" },
            { "name": "Maestría en Terapia Familiar", "faculty": "FAPSI" },
            { "name": "Doctorado en Consejería Familiar", "faculty": "FAPSI" },
            { "name": "Terapia Fisica", "faculty": "FACSA" },
            { "name": "Enfermeria", "faculty": "FACSA" },
            { "name": "QCB", "faculty": "FACSA" },
            { "name": "Médico Cirujano", "faculty": "FACSA" },
            { "name": "Nutrición", "faculty": "FACSA" },
            { "name": "Terapia Física", "faculty": "FACSA" },
            { "name": "Químico en Alimentos", "faculty": "FACSA" },
            { "name": "Cirujano Dentista", "faculty": "FACSA" },
            { "name": "Tecnología Dental", "faculty": "FACSA" },
            { "name": "Especialidad en Gerencia de Estilos de Vida Saludable", "faculty": "FACSA" },
            { "name": "Especialidad en Promoción de la Salud", "faculty": "FACSA" },
            { "name": "Maestría en Salud Pública", "faculty": "FACSA" },
            { "name": "ISC", "faculty": "FITEC" },
            { "name": "IET", "faculty": "FITEC" },
            { "name": "ITIC", "faculty": "FITEC" },
            { "name": "IGTIC", "faculty": "FITEC" },
            { "name": "IIS", "faculty": "FITEC" },
            { "name": "Maestría en REdes y Seguridad", "faculty": "FITEC" },
            { "name": "Teologia", "faculty": "FATAME" },
            { "name": "Otras", "faculty": "Otras" }
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
