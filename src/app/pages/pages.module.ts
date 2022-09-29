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
@NgModule({
  declarations: [
    HomeComponent,
    PagesComponent,
    ListComponent,
    SearchcontentPipe,
    DynamicFormsComponent,
    FilterdataPipe
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule
  ],
  providers: [UserService]
})
export class PagesModule { }
