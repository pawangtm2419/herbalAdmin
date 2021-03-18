import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginGuard } from './login/login.guard';
import { AppointmentModule } from './appointment/appointment.module';
import { PatientModule } from './patient/patient.module';
import { CategoryComponent } from './category/category.component';
import { WishComponent } from './wish/wish.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { BlogComponent } from './blog/blog.component';
import { BlogDetailComponent } from './blog/blog-detail/blog-detail.component';
import { AddProductComponent } from './product/add-product/add-product.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'enquiry', loadChildren: './appointment/appointment.module#AppointmentModule', canActivate: [LoginGuard] },
  { path: 'patient', loadChildren: './patient/patient.module#PatientModule', canActivate: [LoginGuard] },
  { path: 'category', component: CategoryComponent, canActivate: [LoginGuard] },
  { path: 'wish', component: WishComponent, canActivate: [LoginGuard] },
  { path: 'product', component: ProductComponent, canActivate: [LoginGuard] },
  { path: 'product/:id', component: ProductDetailComponent, canActivate: [LoginGuard] },
  { path: 'add-product', component: AddProductComponent, canActivate: [LoginGuard] },
  { path: 'blog', component: BlogComponent, canActivate: [LoginGuard] },
  { path: 'blog/:id', component: BlogDetailComponent, canActivate: [LoginGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
