import { Component, OnInit } from '@angular/core';
import { UtilServiceService } from 'src/app/service/util-service.service';

@Component({
  selector: 'app-classmates',
  templateUrl: './classmates.component.html',
  styleUrls: ['./classmates.component.scss']
})
export class ClassmatesComponent implements OnInit {

  pagination = {
    limit: 10,
    page: 1,
    pages: null,
    total: null
  }
  students: any;
  show = true;
  showForm = false;
  student: any;
  constructor(
    public service: UtilServiceService
  ) { }

  ngOnInit(): void {
    this.getListStudents()
  }

  checkBack(event: boolean) {
    this.showForm = event;
    this.getListStudents();
  }

  getListStudents() {
    this.service.httpGet(`${this.service.URL.STUDENTS}?page=${this.pagination.page}&limit=${this.pagination.limit}`, null).subscribe(
      res => {
        console.log(res);
        this.students = res.body;
      },
      e => {
        console.log(e);
      }
    );
  }
  viewForm() {
    this.showForm = !this.showForm;
    this.student = null;
  }

  getStudent(item: any) {
    this.showForm = true;
    this.student = item;
    console.log(item);
  }

}
