import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { TabserviceService } from 'src/app/services/tabservice.service';
import { ComponentRefComponent } from '../component-ref/component-ref.component';
// import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { from, map } from 'rxjs';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { ROUTES } from '../../utilities/routes';

@Component({
  selector: 'app-dynamic-components',
  templateUrl: './dynamic-components.component.html',
  styleUrls: ['./dynamic-components.component.scss']
})
export class DynamicComponentsComponent implements OnInit {

  componentData = { cmpId: '1', cmpName: 'mycmp', cmpMessage: 'hii this is dynamic cmp' };
  componentsToShow: any = [];
  dynamicCpmponents: any = []
  tabContent: any;
  activeComponent: any;
  @ViewChild('dynamicCmp', { read: ViewContainerRef })
  private viewRef!: ViewContainerRef;

  constructor(private tabService: TabserviceService, private router: Router) { }

  ngOnInit(): void {
    this.getCompoents();
  }

  getCompoents() {
    this.componentsToShow = this.tabService.tabsToOpen;
    const currentTab = from(this.tabService.currentSelectedTabToOpen);
    currentTab.subscribe({
      next: (data: any) => {
        this.activeComponent = data;
        setTimeout(() => {
          this.addCoponent(data);
        }, 100)
      }
    })

  }

  setActiveTab(currentTab: any) {
    console.log('tab to make active:', currentTab);
    // 
  }

  loadTab(tabinfo: any) {
    this.activeComponent = null;
    this.activeComponent = tabinfo;
    this.tabContent = tabinfo
    this.addCoponent(tabinfo);
  }

  addCoponent(cmpdetails: any) {
    console.log('cmpDetails to add: ', cmpdetails);
    this.viewRef.clear()
    this.dynamicCpmponents = [];
    const component = this.viewRef.createComponent(ComponentRefComponent);
    // Push the component so that we can keep track of which components are created
    this.dynamicCpmponents.push(component);
    console.log(this.dynamicCpmponents);
    component.instance.componentData = cmpdetails
    component.instance.setData('Hii this outputdata');
  }

  sendDataToDynamic() {
    this.dynamicCpmponents[0].instance.setData('Hi Gaurav I am data from parent');
  }

  backToTableView() {
    this.router.navigate([ROUTES.table]);
  }
  closeTab(tabinfo: any) {
    let tabindex = this.tabService.tabsToOpen.indexOf(tabinfo);
    console.log('service: ', this.tabService.tabsToOpen, this.componentsToShow)
    if (tabindex > -1) {
      // this.activeComponent = this.componentsToShow[tabindex + 1];
      if(tabindex === (this.componentsToShow.length - 1)){
        if(this.componentsToShow[tabindex].componentId === this.activeComponent.componentId){
          this.activeComponent = this.componentsToShow[tabindex - 1];
        }
        this.tabService.tabsToOpen.splice(tabindex,1);
        this.addCoponent(this.activeComponent);
        return;
      }
      this.addCoponent(this.activeComponent);
      this.tabService.tabsToOpen.splice(tabindex,1);
      if(this.componentsToShow.length === 1){
        this.activeComponent = this.componentsToShow[0];
        this.addCoponent(this.activeComponent);
      }
    }
    if(this.componentsToShow.length === 0){
      this.router.navigate([ROUTES.table]);
    }
    
  }


  ngOnDestroy() {
    this.tabService.currentSelectedTabToOpen = [];
    this.viewRef.clear();
  }

}
