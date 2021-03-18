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
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: [];
  displayedColumns: string[] = ['id', 'pname', 'purl', 'pcategory', 'pimage', 'pbanner', 'pdetail', 'pmrp', 'puse', 'psku'];
  error: '';
  constructor(private service: AppService, private router: Router) { }

  ngOnInit(): void {
    this.verifyServer();
    this.getProductList();
  }
  getProductList(): void {
    this.service.getProductData().subscribe((res: []) => {
      this.products = res;
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
