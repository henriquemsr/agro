import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilServiceService } from '../service/util-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  body = {
    id: "",
    username: "",
    email: "",
    roles: [],
    accessToken: ""
  }

  constructor(
    public service: UtilServiceService,
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  login() {
    let send = {
      username: "henriquemendes25",
      password: "121513"
    }
    this.service.httpPost(this.service.URL.LOGIN, send, false).subscribe(
      res => {
        this.body = res.body as any;
        this.service.token = this.body.accessToken;
        localStorage.setItem('token', this.body.accessToken);
        this.route.navigate(['/main']);

      },
      e => {
        console.log(e);
      }
    );
  }

}
