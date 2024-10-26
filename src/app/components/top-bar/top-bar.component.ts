import { Component, OnInit } from '@angular/core';
import { UtilServiceService } from 'src/app/service/util-service.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  toDo = false;

  constructor(public service: UtilServiceService) { }

  ngOnInit(): void {
  }

  logout() {
    localStorage.clear();
    this.service.navigate('login', null);
  }

}
