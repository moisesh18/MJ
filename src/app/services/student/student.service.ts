import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Student } from '../../models/student';
import { environment } from '../../../environments/environment';
import { Config } from '../../ngx-easy-table/model/config';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  public static config: Config = {
    searchEnabled: true,
    headerEnabled: true,
    orderEnabled: true,
    orderEventOnly: false,
    globalSearchEnabled: true,
    paginationEnabled: true,
    exportEnabled: false,
    clickEvent: false,
    selectRow: false,
    selectCol: false,
    selectCell: false,
    rows: 10,
    additionalActions: false,
    serverPagination: false,
    isLoading: false,
    detailsTemplate: false,
    groupRows: false,
    paginationRangeEnabled: true,
    collapseAllRows: false,
    checkboxes: false,
    resizeColumn: true,
    fixedColumnWidth: false,
    horizontalScroll: false,
    draggable: false,
    logger: false,
    showDetailsArrow: false,
    showContextMenu: false,
    persistState: false,
    paginationMaxSize: 5,
    tableLayout: {
      style: 'normal', // or big or tiny
      theme: 'normal', // or dark
      border: true,
      hover: true,
      striped: false,
    }
  };
  selectedStudent: Student;
  careers: {};
  shirt_size: {};
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
    this.selectedStudent = new Student();
  }

  getStudents() {
    return this.http.get(this.URL_API);
  }

  postStudent(Student: Student) {
    return this.http.post(this.URL_API, Student);
  }

  putStudent(student: Student) {
    return this.http.put(this.URL_API + `/${student._id}`, student);
  }

  deleteStudent(_id: string) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}
