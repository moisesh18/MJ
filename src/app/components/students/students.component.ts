import { Component, OnInit } from '@angular/core';
import {StudentService } from '../../services/student/student.service';
import { Student } from '../../models/student';
import { NgForm } from '@angular/forms';

declare var M: any;
declare var jquery:any;
declare var $ :any;
declare var edit: boolean;

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
  providers: [StudentService]
})
export class StudentsComponent implements OnInit {

  init: Boolean;
  constructor(private studentService:StudentService) { }

  ngOnInit() {
    this.getStudents();
    $('#studentForm #edit, .food-conditional').hide();
    M.AutoInit();
    $('#food-conditional').change(function() {
      if($(this).is(":checked")) {
        $(".food-conditional").fadeIn();
         return;
      }
      $(".food-conditional").fadeOut();
   });
  }


  addStudent(form : NgForm){
    if(!form.value._id){
      form.value._id = form.value.first_name + form.value.last_name;
    }
    this.studentService.postStudent(form.value)
      .subscribe(res=>{
        this.resetForm(form);
        M.toast({html: 'El estudiante ha sido creado exitosamente'});
        this.getStudents();
      });
  }

  editStudent(form : NgForm){
    this.studentService.putStudent(form.value)
      .subscribe(res => {
        console.log(form.value);
        this.resetForm(form);
        M.toast({html: 'El estudiante ha sido editado exitosamente'});
        this.getStudents();
      });
  }

  selectStudent(student: Student){
    $('#studentForm #edit').show();
    $('#studentForm #submit').hide();
    $('.text-area-fix').addClass('active');
    if(student.resident){
      $("#residence-field").fadeIn();
    }
    this.studentService.selectedStudent = student;
  }

  getStudents(){
    this.studentService.getStudents()
      .subscribe(res => {
        this.studentService.students = res as Student[];
      });
  }
  
  deleteStudent(_id:string){
    $('#studentForm #edit').hide();
    $('#studentForm #submit').show();
    if(confirm('¿Estas seguro de eliminar este usuario?')){
      this.studentService.deleteStudent(_id)
        .subscribe(res => {
          this.getStudents();
          M.toast({html: 'El estudiante ha sido eliminado exitosamente'});
        }); 
    }
  }

  resetForm(form? : NgForm){
    if (form){
      form.reset();
      $('#studentForm #edit').hide();
      $('#studentForm #submit').show();
      this.studentService.selectedStudent = new Student();
    }
  }

}
