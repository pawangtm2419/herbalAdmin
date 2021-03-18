import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  panelOpenState = false;
  constructor(public router: Router, public service: AppService) { }
  ngOnInit() { }
  getLoginVerify() {
    if (this.service.isLoggedIn) {
      return true;
    }
  }
}

