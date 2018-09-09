import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Enroll} from '../../models/enroll';
import {Student} from '../../models/student';
import {Club} from '../../models/club';
import {Cycle} from '../../models/cycle';

@Injectable({
  providedIn: 'root'
})
export class EnrollsService {

  selected: Enroll;
  selectOptions : {};
  plural : Enroll[];
  students : Student[];
  clubs : Club[];
  cycles : Cycle[];
  ip = window.location.hostname;
  readonly URL_API =  "http://"+this.ip+':3000/api/enrolls';
  readonly URL_STUDENTS = "http://"+this.ip+':3000/api/students';
  readonly URL_CLUBS = "http://"+this.ip+':3000/api/clubs';
  readonly URL_CYCLES = "http://"+this.ip+':3000/api/cycles';
  constructor(private http: HttpClient) { 
    this.selected = new Enroll();
  }

  get(){
    return this.http.get(this.URL_API); 
  }

  getClubs(){
    return this.http.get(this.URL_CLUBS); 
  }

  getEnrolls(_id: String){
    return this.http.get(this.URL_API + `/${_id}/enrolls`); 
  }

  getStudents(){
    return this.http.get(this.URL_STUDENTS); 
  }

  getCycles(){
    return this.http.get(this.URL_CYCLES); 
  }

  post(single:Enroll){
    return this.http.post(this.URL_API,single);
  }


  put(single: Enroll){    
    return this.http.put(this.URL_API + `/${single._id}`, single);
  }

  delete(_id:string){
    return this.http.delete(this.URL_API+`/${_id}`);
  }
}
