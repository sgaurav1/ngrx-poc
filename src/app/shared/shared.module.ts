import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { AuthService } from '../auth/services/auth.service';
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { TagInputModule } from 'ngx-chips';
// import { TabsModule } from 'ngx-bootstrap/tabs';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgMultiSelectDropDownModule,
    TagInputModule,
    // TabsModule
  ],
  exports: [
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgMultiSelectDropDownModule,
    TagInputModule,
    // TabsModule 
  ],
  providers: [AuthService],
})
export class SharedModule { }
