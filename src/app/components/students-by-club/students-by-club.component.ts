import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../../models/student';
import { ClubService } from '../../services/club/club.service';
import { AuthService } from '../../services/auth/auth.service';
import { StudentService } from '../../services/student/student.service';

declare var M: any;
declare var $: any;

@Component({
    selector: 'app-students-by-club',
    templateUrl: './students-by-club.component.html',
    styleUrls: ['./students-by-club.component.css'],
    providers: [StudentService]
})
export class StudentsByClubComponent implements OnInit {
    id: any;
    columns: any;
    currentUser: any;
    constructor(private route: ActivatedRoute, public service: ClubService, public AuthService: AuthService) {
        var self = this;
        this.columns = [
            [{
                title: 'Matricula',
                field: 'student._id',
                sortable: true
            },
            {
                title: 'Nombre',
                field: 'student.first_name',
                sortable: true
            },
            {
                title: 'Carrera',
                field: 'student.career',
                sortable: true
            },
            {
                title: 'Año',
                field: 'student.year',
                sortable: true
            },
            {
                title: 'Fecha de nacimiento',
                field: 'student.birthday',
                sortable: true
            },
            {
                title: 'Email',
                field: 'student.email',
                sortable: true
            },
            {
                title: 'Telefono',
                field: 'student.phone',
                sortable: true
            },
            {
                title: 'Interno',
                field: 'student.resident',
                sortable: true
            },
            {
                title: 'Dormitorio',
                field: 'student.residence',
                sortable: true
            }]
        ];
    }

    async ngOnInit() {
        await this.AuthService.CurrentUser();
        this.get();
    }

    get() {
        $('.bTable').bootstrapTable("destroy");
        this.service.getEnrolls(this.AuthService.user.club)
            .subscribe(res => {
                $('.bTable').bootstrapTable({
                    columns: this.columns,
                    data: res as Student[]
                })
            });
    }

}
