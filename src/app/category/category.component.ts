import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataModel } from '../app.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})

export class CategoryComponent implements OnInit {
  categorydata = [];
  error = '';
  displayedColumns: string[] = ['id', 'catename', 'timestamp', 'edit', 'delete'];
  category: DataModel = new DataModel();
  categoryForm: FormGroup;
  panelOpenState = false;
  constructor(private service: AppService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.verifyServer();
    this.getCategory();
    this.categoryForm = this.formBuilder.group({
      categoryname: [this.category.categoryname, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    });
  }

  getCategory(): void {
    this.service.getCategoryTip().subscribe((res: []) => {
      this.categorydata = res;
    },
      (err) => {
        this.error = err;
      }
    );
  }

  setCategoryData(event: { preventDefault: () => void; }) {
    event.preventDefault();
    const categoryname = this.category.categoryname;
    const timestamp = new Date().toDateString();
    this.service.setCategory(categoryname, timestamp).subscribe(data => {
      if (data.success) {
        window.alert(data.serect);
        this.category = new DataModel();
        this.getCategory();
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

  catrgoryedit(cid) {
   this.service.categoryediting(cid);
  }

  categorydelete(cid) {
    this.service.categorydeleted(cid).subscribe(data => {
      if (data.success) {
        window.alert(data.serect);
        this.getCategory();
      } else {
        window.alert(data.serect);
      }
    });
  }
}
