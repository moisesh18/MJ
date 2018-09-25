import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../../models/student';
import { ClubService } from '../../services/club/club.service';
import { Club } from '../../models/club';

@Component({
  selector: 'app-students-by-club',
  templateUrl: './students-by-club.component.html',
  styleUrls: ['./students-by-club.component.css'],
  providers: [ClubService]
})
export class StudentsByClubComponent implements OnInit {
  id: any;
  private sub: any;
  constructor(private route: ActivatedRoute, private service: ClubService) { }

  ngOnInit() { 
    this.get();
    this.sub = this.route.params.subscribe(params => {
        this.id = params['id'];     
    });
  }

  get(){
    this.service.getEnrolls("5b83753ecbadf31b2c0313e6")
      .subscribe(res => {
        this.service.plural = res as Club[];
      });
  }
  

}
