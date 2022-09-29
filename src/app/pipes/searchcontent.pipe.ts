import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchcontent'
})
export class SearchcontentPipe implements PipeTransform {

  transform(items: [], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if(!searchText){
      return items;
    }
    searchText = searchText.toLocaleLowerCase();
    return items.filter((it:any)=>{
      return it.toLocaleLowerCase().includes(searchText);
    })
  }

}
