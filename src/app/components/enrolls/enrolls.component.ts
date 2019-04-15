import { Component, OnInit } from '@angular/core';
import { EnrollsService } from '../../services/enrolls/enrolls.service';
import { Enroll } from '../../models/enroll';
import { Student } from '../../models/student';
import { Club } from '../../models/club';
import { Cycle } from '../../models/cycle';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

declare var $: any;

@Component({
  selector: 'app-directors',
  templateUrl: './enrolls.component.html',
  styleUrls: ['./enrolls.component.css'],
  providers: [EnrollsService]
})
export class EnrollsComponent implements OnInit {
  select_student: any;
  select_club: any;
  select_cycles: any;
  constructor(public service: EnrollsService, public AuthService: AuthService) {
    var self = this;
    var operateEvents = {
      'click .edit': function (e, value, row, index) {
        self.select(row)
      },
      'click .delete': function (e, value, row, index) {
        self.delete(row._id)
      }
    }
    this.service.columns = Object.assign(this.service.columns[0],
      [{
        field: 'operate',
        title: 'Operaciones',
        align: 'center',
        events: operateEvents,
        formatter: this.operateFormatter()
      }])
  }

  async ngOnInit() {
    this.get();
    this.getSelect();
    $('.bTable').bootstrapTable({
      columns: this.service.columns,
      showExport: true,
      exportDataType: 'all',
      exportTypes: ['excel'],
      search: true,
      sortName: "student.fullName",
      sortOrder: "asc",
      pagination: true,
      showPaginationSwitch: true,
      rememberOrder: true,
      showColumns: true,
      locale: "es-MX",
      exportOptions: {
        "fileName": "Inscritos",
        "ignoreColumn": ["operate"]
      }
    })
  }

  add(form?: NgForm) {
    if (form.value._id) {
      this.service.put(form.value)
        .subscribe((res: any) => {
          this.AuthService.toast(res.message)
          if (res.success) {
            this.resetForm(form);
            this.get();
          }
        });
    } else {
      delete form.value._id;
      this.service.post(form.value)
        .subscribe((res: any) => {
          this.AuthService.toast(res.message)
          if (res.success) {
            this.resetForm(form);
            this.get();
          }
        });
    }

  }

  select(single: Enroll) {
    this.service.selected = single;
  }

  getSelect() {
    this.service.getStudents()
      .subscribe(res => {
        this.select_student = res as Student[];
      });
    this.service.getClubs()
      .subscribe(res => {
        this.select_club = res as Club[];
        this.service.selected.club._id = res[0]._id;
      });
    this.service.getCycles()
      .subscribe(res => {
        this.select_cycles = res as Cycle[];
        this.service.selected.cycle._id = res[0]._id;
      });
  }

  get() {
    this.service.get()
      .subscribe(res => {
        var data = res as Enroll[]
        $('.bTable').bootstrapTable("load", data)
      });
  }

  operateFormatter() {
    if (this.AuthService.gisSecretary) {
      return [
        '<a href="javascript:void(0)" class="edit" *ngIf="false"><i class="material-icons">edit</i></a><a href="javascript:void(0)" class="delete"><i class="material-icons">delete</i></a>'
      ].join('')
    } else {
      return [
        '<a href="javascript:void(0)" class="edit" *ngIf="false"><i class="material-icons">edit</i></a>'
      ].join('')
    }
  }

  delete(_id: string) {
    if (confirm('¿Estas seguro de eliminar este usuario?')) {
      this.service.delete(_id)
        .subscribe((res: any) => {
          this.get();
          this.AuthService.toast(res.message)
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
