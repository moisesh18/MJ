import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

declare var $: any;

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

    constructor(public router: Router, public AuthService: AuthService) { }

    ngOnInit() {
    }

    doLogin(form?: NgForm) {
        this.AuthService.toast("Cargando... (puede tomar 15 segs)");
        this.AuthService.doLogin(form);
    }

}
