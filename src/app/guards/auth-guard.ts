import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router, public service: AuthService) { }
    canActivate(): boolean {
        if (this.service.isLoggedIn()) {
            return true;
        } else {
            alert("Por favor, inicia sesion");
            this.router.navigate(["/login"]);
            return false;
        }
    }
}