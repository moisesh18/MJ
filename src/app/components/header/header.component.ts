import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

declare var $: any;

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    selected: {};
    constructor(public AuthService: AuthService) { }

    ngOnInit() {
        //$('.sidenav').sidenav();
    }

    doLogout() {
        this.AuthService.doLogout();
    }

}
