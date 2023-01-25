import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TabserviceService } from 'src/app/services/tabservice.service';
import {ROUTES} from '../../utilities/routes';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  tableData:any = [];
  constructor(private tabService: TabserviceService, private router: Router) { }

  ngOnInit(): void {
    this.tabService.getComponents().subscribe({
      next: (res:any)=>{
        this.tableData = res.components;

      },
      error: (err)=>{
        console.log(err);
      }
    })
  }

  viewDataDetails(data: any){
    console.log('data to view: ',data);
    this.tabService.setTabToShow(data);
    this.tabService.setCurrentSelectedTab(data);
    this.router.navigate([ROUTES.dynamicComponents]);
  }

}
