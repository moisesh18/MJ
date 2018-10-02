import { Component, OnInit } from '@angular/core';
import { ClubService } from '../../services/club/club.service';
import { Club } from '../../models/club';
import { NgForm } from '@angular/forms';

declare var M: any;
declare var jquery:any;
declare var $ :any;
declare var edit: boolean;

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.css'],
  providers: [ClubService]
})
export class ClubsComponent implements OnInit {

  constructor(public service: ClubService) { }

  ngOnInit() {
    this.get();
    M.AutoInit();
  }

  add(form?: NgForm){
    if (form.value._id){
      this.service.put(form.value)
      .subscribe(res => {
        this.resetForm(form);
        this.get();
        M.toast({html: 'El participante de la directiva ha sido editado exitosamente'});
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

  select(single: Club){
    this.service.selected = single;
  }
  
  get(){
    this.service.get()
      .subscribe(res => {
        this.service.plural = res as Club[];
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
      $('#studentForm #submit').show();
      this.service.selected = new Club();
    }
  }


}
