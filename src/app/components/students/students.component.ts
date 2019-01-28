import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student/student.service';
import { Student } from '../../models/student';
import { NgForm } from '@angular/forms';

declare var M: any;
declare var $: any;

@Component({
    selector: 'app-students',
    templateUrl: './students.component.html',
    styleUrls: ['./students.component.css'],
    providers: [StudentService]
})
export class StudentsComponent implements OnInit {
    columns: any;
    constructor(public service: StudentService) {
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
                title: 'Matricula',
                field: '_id',
                sortable: true
            },
            {
                title: 'Nombre',
                field: 'fullName',
                sortable: true
            },
            {
                title: 'Carrera',
                field: 'career',
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
        $('#studentForm #edit, .food-conditional').hide();
        M.AutoInit();
        $('#food-conditional').change(function () {
            if ($(this).is(":checked")) {
                $(".food-conditional").fadeIn();
                return;
            }
            $(".food-conditional").fadeOut();
        });
    }

    get() {
        $('.bTable').bootstrapTable("destroy");
        this.service.get()
            .subscribe(res => {
                $('.bTable').bootstrapTable({
                    columns: this.columns,
                    data: res as Student[]
                })
            });
    }

    operateFormatter() {
        return [
            '<a href="javascript:void(0)" class="edit"><i class="material-icons">edit</i></a><a href="javascript:void(0)" class="delete"><i class="material-icons">delete</i></a>'
        ].join('')
    }


    addStudent(form: NgForm) {
        if (!form.value._id) {
            form.value._id = form.value.first_name + form.value.last_name;
        }
        this.service.post(form.value)
            .subscribe(res => {
                this.resetForm(form);
                M.toast({ html: 'El estudiante ha sido creado exitosamente' });
                this.get();
            });
    }

    editStudent(form: NgForm) {
        this.service.put(form.value)
            .subscribe(res => {
                this.resetForm(form);
                M.toast({ html: 'El estudiante ha sido editado exitosamente' });
                this.get();
            });
    }

    select(student: Student) {
        $('#studentForm #edit').show();
        $('#studentForm #submit').hide();
        $('.text-area-fix').addClass('active');
        if (student.resident) {
            $("#residence-field").fadeIn();
        }
        this.service.selected = student;
    }

    delete(_id: string) {
        $('#studentForm #edit').hide();
        $('#studentForm #submit').show();
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
            this.service.selected = new Student();
        }
    }

}
