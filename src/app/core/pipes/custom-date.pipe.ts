import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {
  transform(value: any, ...args: any): any {
    const getDate = value.split(' ')[0].split('-');
    const getTime = value.split(' ')[1];
    const newDate = new Date(getDate);
    newDate.setHours(getTime.split(':')[0]);
    newDate.setMinutes(getTime.split(':')[1]);
    const datePipe = new DatePipe('en-US');
    let transformDate = 'dd/MM/yyyy - h:mm a';
    if(args[0] === 'time') {
      transformDate = transformDate.split('-')[1].trim();
    }
    return datePipe.transform(newDate, transformDate);
  }

}
