import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MarqueeData } from '../app.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wish',
  templateUrl: './wish.component.html',
  styleUrls: ['./wish.component.css']
})
export class WishComponent implements OnInit {
  marqueeWish: MarqueeData = new MarqueeData();
  marqueeForm: FormGroup;
  wish: [];
  error = '';
  displayedColumns: string[] = ['id', 'wish', 'timestamp', 'active', 'activate', 'deactivate'];
  constructor(private service: AppService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.verifyServer();
    this.getWish();
    this.marqueeForm = this.formBuilder.group({
      wish: [this.marqueeWish.wish, [Validators.required, Validators.minLength(25), Validators.maxLength(1499)]],
    });
  }
  onWishSubmit(event: { preventDefault: () => void; }) {
    event.preventDefault();
    const wish = this.marqueeWish.wish;
    const timestamp = new Date().toDateString();
    this.service.getWishUpload(wish, timestamp).subscribe(data => {
      if (data.success) {
        window.alert(data.serect);
        this.getWish();
      } else {
        window.alert(data.serect);
      }
    });
  }
  getWish(): void {
    this.service.getWishData().subscribe((res: []) => {
      this.wish = res;
    },
      (err) => {
        this.error = err;
      }
    );
  }
  wishactivate(id) {
    this.service.getWishActivate(id).subscribe(data => {
      if (data.success) {
        window.alert(data.serect);
        this.getWish();
      } else {
        window.alert(data.serect);
      }
    });
  }
  wishdeactivate(id) {
    this.service.getWishDeactivate(id).subscribe(data => {
      if (data.success) {
        window.alert(data.serect);
        this.getWish();
      } else {
        window.alert(data.serect);
      }
    });
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
