import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

import { AuthGuardService } from './auth-guard.service';
import { InventoryComponent } from './inventory/inventory.component';
import { AddprodComponent } from './addprod/addprod.component';
import { EditprodComponent } from './editprod/editprod.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'register',
    component: RegistrationComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'inventory',
    component: InventoryComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'inventory/add',
    component: AddprodComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'inventory/edit/:id',
    component: EditprodComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
