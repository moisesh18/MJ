import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Director} from '../../models/director';
import {Student} from '../../models/student';
import {Club} from '../../models/club';

@Injectable({
  providedIn: 'root'
})
export class DirectorsService {

  selected: Director;
  selectOptions : {};
  directors : Director[];
  students : Student[];
  clubs : Club[];
  ip = window.location.hostname;
  readonly URL_API = "http://"+this.ip+':3000/api/directors';
  readonly URL_STUDENTS = "http://"+this.ip+':3000/api/students';
  readonly URL_CLUBS = "http://"+this.ip+':3000/api/clubs';

  constructor(private http: HttpClient) { 
    this.selected = new Director();
  }

  getStudents(){
    return this.http.get(this.URL_STUDENTS); 
  }

  getClubs(){
    return this.http.get(this.URL_CLUBS); 
  }

  get(){
    return this.http.get(this.URL_API); 
  }

  post(single:Director){
    return this.http.post(this.URL_API,single);
  }

  put(single: Director){    
    return this.http.put(this.URL_API + `/${single._id}`, single);
  }

  delete(_id:string){
    return this.http.delete(this.URL_API+`/${_id}`);
  }

}
