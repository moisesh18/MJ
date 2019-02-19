import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { DirectorsService } from './services/director/directors.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'app';
    selected: {};
    constructor(public AuthService: AuthService) {

    }

    ngOnInit() {
        if (this.AuthService.user.role == null) {
            this.AuthService.CurrentUser().subscribe(data => this.AuthService.user = data);
        }
    }

}
