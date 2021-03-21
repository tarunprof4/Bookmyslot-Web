import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nodaTime'
})
export class NodaTimePipe implements PipeTransform {

  transform(value: string, country: string): string {
    return value + ' ' + country;
  }

}
