import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface DataServe {
  serverData: Array<object>;
}
interface LoginData {
  success: boolean;
  serect: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public loggedInStatus = JSON.parse(localStorage.getItem('adminloggedIn') || 'false');
  username: any;
  categorydata: [];
  enquiry: [];
  wish: [];
  products: [];
  userdata: [];
  constructor(public http: HttpClient, public router: Router) { }

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
  }
  get isLoggedIn() {
    if (JSON.parse(localStorage.getItem('adminloggedIn'))) {
      return true;
    } else {
      return false;
    }
  }
  getServaer() {
    const username = localStorage.getItem('AdminUserName');
    if (this.isLoggedIn) {
      return this.http.post<LoginData>('http://chetanherbals.com/admin/api/loginverifylogin.php', {
        username
      });
    }
  }
  getLogOut(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  getUserData(username, password) {
    return this.http.post<LoginData>('http://chetanherbals.com/admin/api/login.php', {
      username, password
    });
  }

  getWishUpload(wish: string, timestamp: any) {
    return this.http.post<LoginData>('http://chetanherbals.com/admin/api/wishcreate.php', {
      wish, timestamp
    });
  }

  getWishData(): Observable<[]> {
    return this.http.get('http://chetanherbals.com/admin/api/wishview.php').pipe(map(res => {
      this.wish = res['wish'];
      return this.wish;
    }));
  }

  getWishActivate(id: any) {
    return this.http.post<LoginData>('http://chetanherbals.com/admin/api/wishactive.php', {
      id
    });
  }
  getWishDeactivate(id: any) {
    return this.http.post<LoginData>('http://chetanherbals.com/admin/api/wishdeactive.php', {
      id
    });
  }

  getEnquiryData(): Observable<[]> {
    return this.http.get('http://chetanherbals.com/admin/api/enquiry.php').pipe(map(res => {
      this.enquiry = res['enquiry'];
      return this.enquiry;
    }));
  }

  getCategoryTip(): Observable<[]> {
    return this.http.get('http://chetanherbals.com/admin/api/category.php').pipe(map(res => {
      this.categorydata = res['categorydata'];
      return this.categorydata;
    }));
  }
  setCategory(categoryname, timestamp) {
    return this.http.post<LoginData>('http://chetanherbals.com/admin/api/categoryadd.php', {
      categoryname, timestamp
    });
  }
  categoryediting(cid) {
    console.log(cid);
  }
  categorydeleted(cid) {
    return this.http.post<LoginData>('http://chetanherbals.com/admin/api/categorydelete.php', {
      cid
    });
  }

  userData() {
    return this.http.get('http://chetanherbals.com/admin/api/userdata.php').pipe(map(res => {
      this.userdata = res['user'];
      return this.userdata;
    }));
  }

  getTips(timeStamp) {
    console.log(timeStamp);
  }
  getAppointmentData() {
    return this.http.get<DataServe>('https://chetanclinic.com/admin/api/appointment.php');
  }

  getTipsData() {
    return this.http.get<DataServe>('https://chetanclinic.com/admin/api/tips.php');
  }

  getProductData() {
    return this.http.get('./assets/products.json').pipe(map(res => {
      this.products = res['products'];
      return this.products;
    }));
  }
}
