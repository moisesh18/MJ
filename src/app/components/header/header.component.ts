import { Component, OnInit } from '@angular/core';
import { DirectorsService } from '../../services/director/directors.service';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    constructor(public AuthService: DirectorsService) { }

    ngOnInit() {
    }

    doLogout() {
        this.AuthService.doLogout();
    }

}
