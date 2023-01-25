import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';
import { ListComponent } from './list/list.component';
import { SharedModule } from '../shared/shared.module';
import { UserService } from '../services/user.service';
import { SearchcontentPipe } from '../pipes/searchcontent.pipe';
import { DynamicFormsComponent } from './dynamic-forms/dynamic-forms.component';
import { FilterdataPipe } from '../pipes/filterdata.pipe';
import { DynamicComponentsComponent } from './dynamic-components/dynamic-components.component';
import { ComponentRefComponent } from './component-ref/component-ref.component';
import { TabserviceService } from '../services/tabservice.service';
import { TableComponent } from './table/table.component';
@NgModule({
  declarations: [
    HomeComponent,
    PagesComponent,
    ListComponent,
    SearchcontentPipe,
    DynamicFormsComponent,
    FilterdataPipe,
    DynamicComponentsComponent,
    ComponentRefComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule
  ],
  providers: [UserService, TabserviceService]
})
export class PagesModule { }
