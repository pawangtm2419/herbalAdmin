import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  constructor(private service: AppService, private router: Router) { }

  ngOnInit(): void {
    this.verifyServer();
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
