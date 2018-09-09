import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Cycle} from '../../models/cycle';

@Injectable({
  providedIn: 'root'
})
export class CycleService {

  selected: Cycle;
  selectOptions : {};
  plural : Cycle[];
  ip = window.location.hostname;
  readonly URL_API = "http://"+this.ip+':3000/api/cycles';
  constructor(private http: HttpClient) { 
    this.selected = new Cycle();
  }

  get(){
    return this.http.get(this.URL_API); 
  }

  getEnrolls(_id: String){
    return this.http.get(this.URL_API + `/${_id}/enrolls`); 
  }

  post(single:Cycle){
    return this.http.post(this.URL_API,single);
  }

  put(single: Cycle){    
    return this.http.put(this.URL_API + `/${single._id}`, single);
  }

  delete(_id:string){
    return this.http.delete(this.URL_API+`/${_id}`);
  }


}
