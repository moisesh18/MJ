import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student/student.service';
import { ClubService } from '../../services/club/club.service';
import { AuthService } from '../../services/auth/auth.service';
import { EnrollsService } from '../../services/enrolls/enrolls.service';
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
                self.delete(row._id)
            }
        }
        this.columns = [
            [{
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
                title: 'Carrera',
                field: 'student.career',
                sortable: true
            },
            {
                title: 'Año',
                field: 'student.career_year',
                sortable: true
            },
            {
                title: 'Fecha de nacimiento',
                field: 'student.birthday',
                sortable: true,
                visible: false
            },
            {
                title: 'Email',
                field: 'student.email',
                sortable: true,
                visible: false
            },
            {
                title: 'Telefono',
                field: 'student.phone',
                sortable: true,
                visible: false
            },
            {
                title: 'Talla',
                field: 'student.shirt_size',
                sortable: true,
                visible: false
            },
            {
                title: 'Interno',
                field: 'student.resident',
                sortable: true
            },
            {
                title: 'Residencia',
                field: 'student.residence',
                sortable: true
            },
            {
                title: 'Desayuno',
                field: 'student.breakfast',
                sortable: true,
                visible: false
            },
            {
                title: 'Comida',
                field: 'student.lunch',
                sortable: true,
                visible: false
            },
            {
                title: 'Cena',
                field: 'student.dinner',
                sortable: true,
                visible: false
            },
            {
                title: 'Tipo de sangre',
                field: 'student.blood_type',
                sortable: true,
                visible: false
            },
            {
                title: 'Medicinas',
                field: 'student.drugs',
                sortable: true,
                visible: false
            },
            {
                title: 'Alergias',
                field: 'student.allergy',
                sortable: true,
                visible: false
            },
            {
                title: 'Cirugias recientes',
                field: 'student.recent_illness',
                sortable: true,
                visible: false
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

    async ngOnInit() {
        this.get();
        $('#studentForm #editar, .food-conditional').hide();
        M.AutoInit();
        $('#food-conditional').change(function () {
            if ($(this).is(":checked")) {
                $(".food-conditional").fadeIn();
                return;
            }
            $(".food-conditional").fadeOut();
        });
        $('.bTable').bootstrapTable({
            columns: this.columns,
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
        return [
            '<a href="javascript:void(0)" class="edit" *ngIf="false"><i class="material-icons">edit</i></a><a href="javascript:void(0)" class="delete"><i class="material-icons">delete</i></a>'
        ].join('')
    }

    addStudent(form: NgForm) {
        if (!form.value._id) {
            form.value._id = form.value.first_name + form.value.last_name;
        }
        this.service.post(form.value)
            .subscribe((res: any) => {
                M.toast({ html: res.message });
                if (res.success) {
                    this.resetForm(form);
                    this.get();
                }
            });
    }

    editStudent(form: NgForm) {
        this.service.put(form.value)
            .subscribe((res: any) => {
                M.toast({ html: res.message });
                if (res.success) {
                    this.resetForm(form);
                    this.get();
                }
            });
    }

    select(student: Student) {
        $('#studentForm #editar').fadeIn();
        $('#studentForm #submit').fadeToggle();
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
            this.EnrollsService.delete(_id)
                .subscribe((res: any) => {
                    this.get();
                    M.toast({ html: res.message });
                });
        }
    }

    resetForm(form?: NgForm) {
        if (form) {
            form.reset();
            $('#studentForm #editar').fadeToggle();
            $('#studentForm #submit').fadeToggle();
            this.service.selected = new Student();
        }
    }

}
