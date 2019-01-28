import { Component, OnInit } from '@angular/core';
import { ClubService } from '../../services/club/club.service';
import { Club } from '../../models/club';
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
    constructor(public service: ClubService) {
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
            '<a href="javascript:void(0)" class="edit"><i class="material-icons">edit</i></a><a href="javascript:void(0)" class="delete"><i class="material-icons">delete</i></a>'
        ].join('')
    }

    ngOnInit() {
        this.get();
        M.AutoInit();
    }

    add(form?: NgForm) {
        if (form.value._id) {
            this.service.put(form.value)
                .subscribe(res => {
                    this.resetForm(form);
                    this.get();
                    M.toast({ html: 'El participante de la directiva ha sido editado exitosamente' });
                });
        } else {
            delete form.value._id;
            this.service.post(form.value)
                .subscribe(res => {
                    this.get();
                    this.resetForm(form);
                    M.toast({ html: 'El participante de la directiva ha sido creado exitosamente' });
                });
        }

    }

    select(single: Club) {
        this.service.selected = single;
    }

    get() {
        $('.bTable').bootstrapTable("destroy");
        this.service.get()
            .subscribe(res => {
                $('.bTable').bootstrapTable({
                    columns: this.columns,
                    data: res as Club[]
                })
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
            $('#studentForm #submit').show();
            this.service.selected = new Club();
        }
    }


}
