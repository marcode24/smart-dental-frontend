import { AbstractControl } from "@angular/forms";

export class CustomValidators {
  static validDate(control: AbstractControl) {
    const date = control.get('date')?.value.split('-');
    if(!date) {
      throw new Error('date field not found');
    }
    const dateSelected = new Date(date[0], date[1] - 1, date[2])
      .setHours(0,0,0,0);
    const today = new Date().setHours(0,0,0,0);
    if(dateSelected < today) {
      control.get('date')?.setErrors({ isMin: true });
      return { isMin: true };
    } else {
      return null;
    }
  }

  static validTime(control: AbstractControl) {
    const date = control.get('date')?.value.split('-');
    const time = control.get('time')?.value.split(':');

    if(!date || !time) {
      throw new Error('date or time field not found');
    }

    const dateSelectedTime = new Date(date[0], date[1] - 1, date[2])
      .setHours(0,0,0,0);
    const today = new Date().setHours(0,0,0,0);
    const todayDate = new Date().toLocaleString();

    const todayTime = todayDate.split(', ')[1];
    const todayHour = Number(todayTime.split(':')[0]);
    const todayMinutes = Number(todayTime.split(':')[1]);

    const hourSelected = Number(time[0]);
    const minutesSelected = Number(time[1]);

    if(dateSelectedTime === today) {
      if(hourSelected < todayHour ||
        (hourSelected === todayHour && minutesSelected < todayMinutes)) {
          control.get('time')?.setErrors({ isMinTime: true });
          return { isMinTime: true };
      }
    }
    return null;
  }
}
