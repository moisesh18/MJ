import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StudentsComponent } from './components/students/students.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import { DirectorsComponent } from './components/directors/directors.component';
import { TokenInterceptor } from './components/directors/token-interceptor';
import { ClubsComponent } from './components/clubs/clubs.component';
import { CycleComponent } from './components/cycle/cycle.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { EnrollsComponent } from './components/enrolls/enrolls.component';
import { MainComponent } from './components/main/main.component';
import { AuthService } from './services/auth/auth.service';
import { AuthGuard } from './guards/auth-guard';
@NgModule({
    declarations: [
        AppComponent,
        StudentsComponent,
        HeaderComponent,
        FooterComponent,
        HomeComponent,
        DirectorsComponent,
        ClubsComponent,
        CycleComponent,
        EnrollsComponent,
        MainComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        NgSelectModule,
        RouterModule.forRoot([
            {
                path: '',
                component: HomeComponent
            },
            {
                path: 'students',
                component: StudentsComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'directors',
                component: DirectorsComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'clubs',
                component: ClubsComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'cycles',
                component: CycleComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'enrolls',
                component: EnrollsComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'login',
                component: MainComponent
            },
            {
                path: 'logout',
                component: HomeComponent
            }
        ])
    ],
    providers: [
        AuthService,
        AuthGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
