import { Injectable, Injector } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { DirectorsService } from '../../services/director/directors.service';
import { Observable, empty } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from "@angular/router";

declare var M: any;
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private injector: Injector, private router: Router) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authService = this.injector.get(DirectorsService);
        request = request.clone({
            setHeaders: {
                Authorization: authService.getToken() || ""
            }
        });
        return next.handle(request).pipe
            (
                tap(
                    succ => {
                    },
                    err => {
                        if (err.status === 401 || err.status === 403) {
                            M.toast({ html: "No autorizado" });
                            authService.removeToken();
                            this.router.navigate(['/']);
                        }
                    }
                )
            );
    }
}
