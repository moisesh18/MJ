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
  constructor(private route: ActivatedRoute, public service: ClubService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.get();

    });
  }

  get() {
    this.service.getEnrolls(this.id)
      .subscribe(res => {
        this.service.plural = res as Club[];
      });
  }

}
