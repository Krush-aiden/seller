import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(value: [], args?: any): unknown {

    if(!value) return null;
    if(!args) return value;
    args = args.toLowerCase();

      return value.filter((items : any) => {
        if(JSON.stringify(items).toLowerCase().includes(args)){
          return items;
        }
    })
  }

}
