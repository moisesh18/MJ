import { Component, OnInit } from '@angular/core';
import { DirectorsService } from '../../services/director/directors.service';
import { Director } from '../../models/director';
import { Student } from '../../models/student';
import { Club } from '../../models/club';
import { NgForm } from '@angular/forms';

declare var M: any;
declare var $: any;

@Component({
    selector: 'app-directors',
    templateUrl: './directors.component.html',
    styleUrls: ['./directors.component.css'],
    providers: [DirectorsService]
})
export class DirectorsComponent implements OnInit {
    select_student: any;
    select_club: any;
    columns: any;
    constructor(public service: DirectorsService) {
        var self = this;
        var operateEvents = {
            'click .edit': function (e, value, row, index) {
                self.select(row)
            },
            'click .delete': function (e, value, row, index) {
                self.delete(row._id)
            }
        }
        this.columns = [
            [{
                title: 'Puesto',
                field: 'role',
                sortable: true
            },
            {
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
                title: 'Club',
                field: 'club.name',
                sortable: true
            },
            {
                field: 'operate',
                title: 'Operaciones',
                align: 'center',
                events: operateEvents,
                formatter: this.operateFormatter()
            }]
        ];
    }

    ngOnInit() {
        this.get();
        M.AutoInit();
        this.getSelect();
    }

    get() {
        $('.bTable').bootstrapTable("destroy");
        this.service.get()
            .subscribe(res => {
                $('.bTable').bootstrapTable({
                    columns: this.columns,
                    data: res as Director[],
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
                        "fileName": "Directiva",
                        "ignoreColumn": ["operate"]
                    }
                })
            });
    }

    operateFormatter() {
        return [
            '<a href="javascript:void(0)" class="edit"><i class="material-icons">edit</i></a><a href="javascript:void(0)" class="delete"><i class="material-icons">delete</i></a>'
        ].join('')
    }

    add(form?: NgForm) {
        if (form.value.password != "" && form.value.password != form.value.password2) {
            M.toast({ html: 'Las contraseñas no son iguales' });
            return false;
        }
        if (form.value._id) {
            if (form.value.password == "") {
                delete form.value.password;
            }
            this.service.put(form.value)
                .subscribe((res:any) => {
                    this.resetForm(form);
                    this.get();
                    M.toast({ html: res.message });
                });
        } else {
            delete form.value._id;
            this.service.post(form.value)
                .subscribe((res:any) => {
                    this.get();
                    this.resetForm(form);
                    M.toast({ html: res.message });
                });
        }

    }

    select(single: Director) {
        single.password = "";
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
            });
    }

    delete(_id: string) {
        if (confirm('¿Estas seguro de eliminar este usuario?')) {
            this.service.delete(_id)
                .subscribe((res:any) => {
                    this.get();
                    M.toast({ html: res.message });
                });
        }
    }

    resetForm(form?: NgForm) {
        if (form) {
            form.reset();
            $('#studentForm #edit').hide();
            $('#studentForm #submit').show();
            this.service.selected = new Director();
        }
    }
}