import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private login: AppService, private router: Router) { }

  ngOnInit() {
    this.verifyServer();
  }
  getUserData(event) {
    event.preventDefault();
    const target = event.target;
    const username = target.querySelector('#username').value;
    const password = target.querySelector('#password').value;
    this.login.getUserData(username, password).subscribe(data => {
      if (data.success) {
        this.router.navigate(['enquiry']);
        localStorage.setItem('adminloggedIn', 'true');
        localStorage.setItem('AdminUserName', username);
        this.login.setLoggedIn(true);
      } else {
        window.alert(data.serect);
      }
    });
  }

  verifyServer() {
    if (this.login.isLoggedIn) {
      this.login.getServaer().subscribe(data => {
        if (data.success) {
          this.router.navigate(['enquiry']);
        } else {
          window.alert('You are logged out. Login Again!!!');
          this.router.navigate(['login']);
          localStorage.clear();
        }
      });
    } else {
      this.router.navigate(['login']);
      localStorage.clear();
    }
  }
}
