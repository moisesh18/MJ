import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { DirectorsService } from '../services/director/directors.service';

declare var M: any;
@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router, public service: DirectorsService) { }
    canActivate(): boolean {
        if (this.service.isLoggedIn()) {
            return true;
        } else {
            M.toast({ html: "Por favor, inicia sesion" });
            this.router.navigate(["/login"]);
            return false;
        }
    }
}