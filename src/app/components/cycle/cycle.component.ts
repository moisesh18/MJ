import { Component, OnInit } from '@angular/core';
import { CycleService } from '../../services/cycle/cycle.service';
import { Cycle } from '../../models/cycle';
import { NgForm } from '@angular/forms';

declare var M: any;
declare var $: any;

@Component({
    selector: 'app-cycle',
    templateUrl: './cycle.component.html',
    styleUrls: ['./cycle.component.css'],
    providers: [CycleService]
})
export class CycleComponent implements OnInit {
    columns: any;
    constructor(public service: CycleService) {
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

    select(single: Cycle) {
        this.service.selected = single;
    }

    get() {
        $('.bTable').bootstrapTable("destroy");
        this.service.get()
            .subscribe(res => {
                $('.bTable').bootstrapTable({
                    columns: this.columns,
                    data: res as Cycle[]
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
            $('#studentForm #edit').hide();
            $('#studentForm #submit').show();
            this.service.selected = new Cycle();
        }
    }

}
