import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TabserviceService {

  tabsToOpen: any = [];
  currentSelectedTabToOpen: any = [];
  constructor(private http: HttpClient) { }


  getComponents() {
    return this.http.get('../assets/json/dy_components.json');
  }

  addNewDyComponent(compData: any) {
    return this.http.put('src/assets/json/dy_components.json', compData)
  }

  getTabsToShow() {
    return this.tabsToOpen;
  }

  setTabToShow(tab: any) {
    let preTabs = this.tabsToOpen.filter((item: any) => item.componentId === tab.componentId);
    if (preTabs.length === 0) {
      this.tabsToOpen.push(tab);
    }
  }

  getCurrentTabToOpen() {
    return this.currentSelectedTabToOpen;
  }

  setCurrentSelectedTab(tab: any) {
    this.currentSelectedTabToOpen = [];
    this.currentSelectedTabToOpen.push(tab);
  }

}
