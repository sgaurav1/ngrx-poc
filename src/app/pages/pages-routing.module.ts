import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { DynamicComponentsComponent } from './dynamic-components/dynamic-components.component';
import { DynamicFormsComponent } from './dynamic-forms/dynamic-forms.component';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { PagesComponent } from './pages.component';
import { TableComponent } from './table/table.component';
const routes: Routes = [
  {
    path: '', component: PagesComponent,
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: HomeComponent},
      {path: 'list', component: ListComponent},
      {path: 'dynamic-forms', component: DynamicFormsComponent},
      {path: 'dynamic-components', component: DynamicComponentsComponent},
      {path: 'table', component: TableComponent}
    ],
    canActivate: [AuthGuard],
    data: {role: 'ROLE_ADMIN'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
