import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student/student.service';
import { ClubService } from '../../services/club/club.service';
import { AuthService } from '../../services/auth/auth.service';
import { EnrollsService } from '../../services/enrolls/enrolls.service';
import { Student } from '../../models/student';
import { NgForm } from '@angular/forms';
import { async } from '@angular/core/testing';

declare var jquery: any;
declare var $: any;
declare var edit: boolean;


@Component({
    selector: 'app-students',
    templateUrl: './students.component.html',
    styleUrls: ['./students.component.css'],
    providers: [StudentService]
})
export class StudentsComponent implements OnInit {
    editing: boolean = false;
    constructor(
        public service: StudentService,
        public ClubService: ClubService,
        public AuthService: AuthService,
        public EnrollsService: EnrollsService,
    ) {
        var self = this;
        var operateEvents = {
            'click .edit': function (e, value, row, index) {
                self.select(row.student)
            },
            'click .delete': function (e, value, row, index) {
                self.delete(row.student._id)
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

    ngOnInit() {
        if (this.AuthService.user.role == null) {
            this.AuthService.CurrentUser().subscribe(data => this.AuthService.user = data);
        }
        this.get();
        $('.bTable').bootstrapTable({
            columns: this.service.columns,
            showExport: true,
            exportDataType: 'all',
            exportTypes: ['excel'],
            search: true,
            sortName: "fullName",
            sortOrder: "asc",
            pagination: true,
            showPaginationSwitch: true,
            rememberOrder: true,
            showColumns: true,
            locale: "es-MX",
            filterControl: true,
            filterShowClear: true,
            exportOptions: {
                "fileName": "Estudiantes",
                "ignoreColumn": ["operate"]
            }
        })
    }

    get() {
        this.ClubService.getEnrolls()
            .subscribe(res => {
                var data = res;
                $('.bTable').bootstrapTable("load", data)
            });
    }

    operateFormatter() {
        if (this.AuthService.gisAdmin) {
            return [
                '<a href="javascript:void(0)" class="edit" *ngIf="false"><i class="material-icons">edit</i></a><a href="javascript:void(0)" class="delete"><i class="material-icons">delete</i></a>'
            ].join('')
        } else {
            return [
                '<a href="javascript:void(0)" class="edit" *ngIf="false"><i class="material-icons">edit</i></a>'
            ].join('')
        }
    }

    add(form: NgForm) {
        if (!this.editing) {
            this.service.post(form.value)
                .subscribe((res: any) => {
                    this.AuthService.toast(res.message)
                    if (res.success) {
                        this.resetForm(form);
                        this.get();
                    }
                });
        } else {
            this.service.put(form.value)
                .subscribe((res: any) => {
                    this.AuthService.toast(res.message)
                    if (res.success) {
                        this.resetForm(form);
                        this.get();
                        this.editing = false;
                    }
                });
        }

    }

    select(student: Student) {
        this.editing = true;
        this.service.selected = student;
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
            this.service.selected = new Student();
        }
    }

}
