import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

declare var $: any;

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    constructor(public AuthService: AuthService) { }

    async ngOnInit() {
        $('.sidenav').sidenav();
        await this.AuthService.CurrentUser();
    }

    doLogout() {
        this.AuthService.doLogout();
    }

}
