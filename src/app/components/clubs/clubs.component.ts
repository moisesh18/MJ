import { Component, OnInit } from '@angular/core';
import { ClubService } from '../../services/club/club.service';
import { Club } from '../../models/club';
import { AuthService } from '../../services/auth/auth.service';
import { NgForm } from '@angular/forms';

declare var M: any;
declare var $: any;

@Component({
    selector: 'app-clubs',
    templateUrl: './clubs.component.html',
    styleUrls: ['./clubs.component.css'],
    providers: [ClubService]
})
export class ClubsComponent implements OnInit {
    configuration;
    columns: any;
    constructor(public service: ClubService,
        public AuthService: AuthService) {
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

    operateFormatter() {
        return [
            '<a href="javascript:void(0)" class="edit" *ngIf="false"><i class="material-icons">edit</i></a><a href="javascript:void(0)" class="delete"><i class="material-icons">delete</i></a>'
        ].join('')
    }

    ngOnInit() {
        this.get();
        M.AutoInit();
        $('.bTable').bootstrapTable({
            columns: this.columns,
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
                    M.toast({ html: res.message });
                    if (res.success) {
                        this.resetForm(form);
                        this.get();
                    }
                });
        } else {
            delete form.value._id;
            this.service.post(form.value)
                .subscribe((res: any) => {
                    M.toast({ html: res.message });
                    if (res.success) {
                        this.resetForm(form);
                        this.get();
                    }
                });
        }

    }

    select(single: Club) {
        this.service.selected = single;
    }

    get() {
        this.service.get()
            .subscribe(res => {
                var data = res as Club[]
                $('.bTable').bootstrapTable("load", data)
            });
    }

    delete(_id: string) {
        if (confirm('¿Estas seguro de eliminar este usuario?')) {
            this.service.delete(_id)
                .subscribe((res: any) => {
                    this.get();
                    M.toast({ html: res.message });
                });
        }
    }

    resetForm(form?: NgForm) {
        if (form) {
            form.reset();
            $('#studentForm #submit').show();
            this.service.selected = new Club();
        }
    }


}
