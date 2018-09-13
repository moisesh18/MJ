import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Club} from '../../models/club';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  selected: Club;
  selectOptions : {};
  plural : Club[];
  ip = window.location.hostname;
  readonly URL_API = "http://"+this.ip+':51112/api/clubs'; 
  constructor(private http: HttpClient) { 
    this.selected = new Club();
  }

  get(){
    return this.http.get(this.URL_API); 
  }

  getDirectors(_id: String){
    return this.http.get(this.URL_API + `/${_id}/directors`); 
  }

  getEnrolls(_id: String){
    return this.http.get(this.URL_API + `/${_id}/enrolls`); 
  }

  post(single:Club){
    return this.http.post(this.URL_API,single);
  }

  put(single: Club){    
    return this.http.put(this.URL_API + `/${single._id}`, single);
  }

  delete(_id:string){
    return this.http.delete(this.URL_API+`/${_id}`);
  }

}
