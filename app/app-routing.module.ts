import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EmployeeModel} from '../app/employee-dashboard/employee-dashboard-model'
import {} from '../app/employee-dashboard/employee-dashboard.component'

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
