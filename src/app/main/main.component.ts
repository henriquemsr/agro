import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UtilServiceService } from '../service/util-service.service';
export interface Character {
  name: string;
  image: string;
  link: string;
}
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  myList: Character[] = [];
  confirmList: Character[] = [];
  personalMenu: Character[] = [];
  expand = false;
  callBlock = false;


  constructor(
    public httpClient: HttpClient,
    private nav: Router,
    public service: UtilServiceService
  ) { }

  ngOnInit(): void {
    this.getMyList();
  }

  addBlockElement() {
    this.callBlock = true;
  }

  getMyList() {
    this.httpClient.get<Character[]>("assets/data.json")
      .subscribe(list => {
        
        let data = this.service.getStorage('myList');
        if (data) {
          this.myList = data;
          this.confirmList = this.service.getStorage('confirmList');
        } else {
          this.myList = list;
        }
      });
  }

  drop(event: CdkDragDrop<Character[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    this.service.setStorage('myList', this.myList);
    this.service.setStorage('confirmList', this.confirmList);
  }

  goPage(item: any) {
    console.log(item);
    this.nav.navigate([`/${item.link}`]);
  }

}
