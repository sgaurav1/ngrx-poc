import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterdata'
})
export class FilterdataPipe implements PipeTransform {

  transform(items: [], filterobj: any): any {
    if (!items || !filterobj) {
      return items;
    }
    return items.filter((item:any) => item.value.indexOf(filterobj.value) !== -1);
  }

}
