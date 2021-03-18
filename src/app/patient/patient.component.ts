import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  userdata: [];
  displayedColumns: string[] = ['id', 'username', 'unumber', 'umail', 'upasswurd', 'ustreat', 'uadd1', 'uadd2', 'uaddpincode', 'uaddnearby', 'timestamp', 'uactive'];
  error: '';
  constructor(private service: AppService, private router: Router) { }

  ngOnInit(): void {
    this.verifyServer();
    this.getUserData();
  }

  getUserData(): void {
    this.service.userData().subscribe((res: []) => {
      this.userdata = res;
    },
      (err) => {
        this.error = err;
      }
    );
  }

  verifyServer() {
    this.service.getServaer().subscribe(data => {
      if (data.success) {
      } else {
        window.alert('You are logged out. Login Again!!!');
        this.router.navigate(['login']);
        localStorage.clear();
      }
    });
  }
}
