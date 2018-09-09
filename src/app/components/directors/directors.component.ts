import { Component, OnInit } from '@angular/core';
import { DirectorsService } from '../../services/director/directors.service';
import { Director } from '../../models/director';
import { Student } from '../../models/student';
import { Club } from '../../models/club';
import { NgForm } from '@angular/forms';

declare var M: any;
declare var jquery:any;
declare var $ :any;
declare var edit: boolean;
declare var students: any;



@Component({
  selector: 'app-directors',
  templateUrl: './directors.component.html',
  styleUrls: ['./directors.component.css'],
  providers: [DirectorsService]
})
export class DirectorsComponent implements OnInit {
  select_student: any;
  select_club: any;
  constructor(private service: DirectorsService) { }

  ngOnInit() {
    this.get();
    M.AutoInit();
    this.getSelect();
  }

  add(form?: NgForm){
    if (form.value._id){
      this.service.put(form.value)
      .subscribe(res => {
        this.resetForm(form);
        this.get();
        M.toast({html: 'Editado correctamente'});
      }); 
    }else{
      delete form.value._id;
      this.service.post(form.value)
        .subscribe(res=>{
          this.get();
          this.resetForm(form);
          M.toast({html: 'El participante de la directiva ha sido creado exitosamente'});
        });
    }

  }

  select(single: Director){
    this.service.selected = single;
  }
  
  getSelect(){
    this.service.getStudents()
      .subscribe(res => {
        this.service.students = res as Student[];
        this.select_student = this.service.students;
      });
      this.service.getClubs()
        .subscribe(res => {
          this.service.clubs = res as Club[];
          this.select_club = this.service.clubs;
        });
  }
  
  get(){
    this.service.get()
      .subscribe(res => {
        this.service.directors = res as Director[];
      });
  }
  
  delete(_id:string){
    if(confirm('¿Estas seguro de eliminar este usuario?')){
      this.service.delete(_id)
        .subscribe(res => {
          this.get();
          M.toast({html: 'El estudiante ha sido eliminado exitosamente'});
        }); 
    }
  }

  resetForm(form? : NgForm){
    if (form){
      form.reset();
      $('#studentForm #edit').hide();
      $('#studentForm #submit').show();
      this.service.selected = new Director();
    }
  }

}
