import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  enquiryData: [];
  displayedColumns: string[] = ['id', 'username', 'umail', 'unumber', 'question', 'etimestamp'];
  error: '';
  constructor(private service: AppService, private router: Router) { }

  ngOnInit() {
    this.verifyServer();
    this.getData();
  }

  getData(): void {
    this.service.getEnquiryData().subscribe((res: []) => {
      this.enquiryData = res;
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
