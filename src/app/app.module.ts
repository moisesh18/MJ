import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StudentsComponent } from './components/students/students.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import { DirectorsComponent } from './components/directors/directors.component';
import { ClubsComponent } from './components/clubs/clubs.component';
import { CycleComponent } from './components/cycle/cycle.component'
import { NgSelectModule } from '@ng-select/ng-select';
import { EnrollsComponent } from './components/enrolls/enrolls.component';
import { StudentsByClubComponent } from './components/students-by-club/students-by-club.component';
import { TableModule } from 'ngx-easy-table';

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
    StudentsByClubComponent
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
        component: StudentsComponent
      },
      {
        path: 'directors',
        component: DirectorsComponent
      },
      {
        path: 'clubs',
        component: ClubsComponent
      },
      {
        path: 'clubs/:id',
        component: StudentsByClubComponent
      },
      {
        path: 'cycles',
        component: CycleComponent
      },
      {
        path: 'enrolls',
        component: EnrollsComponent
      }
    ]),
    TableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
