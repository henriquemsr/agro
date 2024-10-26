import { Component, OnInit } from '@angular/core';
import { UtilServiceService } from 'src/app/service/util-service.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  list: any;
  students: any;
  studentSelected: any;
  pagination = {
    limit: 10,
    page: 1,
    pages: null,
    total: null
  }
  
  subjectList: any;
  subjectSelected: any;
  idIsubject = '';
  toScheduleShow = false;
  showModal = false;
  searching = '';
  

  constructor(
    public service: UtilServiceService,
    private ActivatedRoute: ActivatedRoute,
    private _back: Location
  ) {
    

  }

  ngOnInit(): void {
    // this.getSchedules();
    this.ActivatedRoute.params.subscribe(params => {
      console.log(params);
      this.subjectSelected = params;
      this.idIsubject = params.id_subject;
      this.getListStudents();
    });
  }

  goBack() {
    this._back.back();
  }

  getListStudents() {
    this.service.httpGet(`${this.service.URL.STUDENTS}?page=${this.pagination.page}&limit=${this.pagination.limit}`, null).subscribe(
      res => {
        this.students = res.body;
        this.students.docs.map((v: any) => {
          v.clicked = false;
        });
        // console.log(this.students.docs);
      },
      e => {
        console.log(e);
      }
    );
  }
  

  selectStudent(item: any) {
    this.students.docs.map((v: any) => {
      v.clicked = false;
    });
    window.scrollTo({
      top: 20,
      behavior: 'smooth',
    });
    this.toScheduleShow = true;
    item.clicked = true;
    this.studentSelected = item;
    console.log(item);

  }

  closeStudentSeleted() {
    this.students.docs.map((v: any) => {
      v.clicked = false;
    });
    this.studentSelected = null;
    this.toScheduleShow = false;
  }

  showModalMatters() {
    this.getSchedules();
    this.students.docs.map((v: any) => {
      v.clicked = false;
    });
    this.toScheduleShow = false;
    this.showModal = true;
  }
  selectMatter(item: any) {
    console.log(item);
  }

  getSchedules() {
    this.service.httpGet(`${this.service.URL.SCHEDULES}?page=${this.pagination.page}&limit=${this.pagination.limit}`, null).subscribe(
      res => {
        this.list = res.body;
        // console.log('for docs', this.list.docs);


        // this.list.docs.map((v: any) => {
        //   v.clicked = false
        // });
      },
      e => {
        console.log(e);
      }
    );
  }

}
