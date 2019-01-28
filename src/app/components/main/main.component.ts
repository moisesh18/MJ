import { Component, OnInit } from '@angular/core';
import { DirectorsService } from '../../services/director/directors.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


declare var M: any;
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(public router: Router, public service: DirectorsService) { }

  ngOnInit() {
  }

  doLogin(form?: NgForm){
    this.service.doLogin(form);
  }

}
