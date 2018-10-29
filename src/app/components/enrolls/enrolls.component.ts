import { Component, OnInit } from '@angular/core';
import { EnrollsService } from '../../services/enrolls/enrolls.service';
import { Enroll } from '../../models/enroll';
import { Student } from '../../models/student';
import { Club } from '../../models/club';
import { Cycle } from '../../models/cycle';
import { NgForm } from '@angular/forms';

declare var M: any;
declare var jquery: any;
declare var $: any;
declare var edit: boolean;
declare var students: any;



@Component({
  selector: 'app-directors',
  templateUrl: './enrolls.component.html',
  styleUrls: ['./enrolls.component.css'],
  providers: [EnrollsService]
})
export class EnrollsComponent implements OnInit {
  configuration;
  columns = [
    { key: 'fullName', title: 'Alumno' },
    { key: 'club', title: 'Club' },
    { key: 'fees', title: 'Inscripcion' },
    { key: 'cycle', title: 'Ciclo' },
    { key: '', title: 'Acciones' },
  ];
  data: any; select_student: any;
  select_club: any;
  select_cycles: any;
  constructor(public service: EnrollsService) { }

  ngOnInit() {
    this.get();
    M.AutoInit();
    this.getSelect();
  }

  add(form?: NgForm) {
    //console.log(form.value);
    if (form.value._id) {
      this.service.put(form.value)
        .subscribe(res => {
          this.resetForm(form);
          this.get();
          M.toast({ html: 'Editado correctamente' });
        });
    } else {
      delete form.value._id;
      //console.log(form.value);
      this.service.post(form.value)
        .subscribe(res => {
          this.get();
          this.resetForm(form);
          M.toast({ html: 'El participante de la directiva ha sido creado exitosamente' });
        });
    }

  }

  select(single: Enroll) {
    this.service.selected = single;
    //console.log(this.service.selected);
  }

  getSelect() {
    this.service.getStudents()
      .subscribe(res => {
        this.select_student = res as Student[];
      });
    this.service.getClubs()
      .subscribe(res => {
        this.select_club = res as Club[];
      });
    this.service.getCycles()
      .subscribe(res => {
        this.select_cycles = res as Cycle[];
        //console.log(this.select_cycles);
      });
  }

  get() {
    this.service.get()
      .subscribe(res => {
        this.data = res;
        //this.service.plural = res as Enroll[];
      });
  }

  delete(_id: string) {
    if (confirm('¿Estas seguro de eliminar este usuario?')) {
      this.service.delete(_id)
        .subscribe(res => {
          this.get();
          M.toast({ html: 'El estudiante ha sido eliminado exitosamente' });
        });
    }
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      $('#studentForm #edit').hide();
      $('#studentForm #submit').show();
      this.service.selected = new Enroll();
    }
  }

}
