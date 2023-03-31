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
    const date = control.get('date')?.value;
    const time = control.get('time')?.value.split(':');
    if(!date || !time) {
      throw new Error('date or time field not found');
    }
    const [ currentHours, currentMinutes ] = time;
    const today = new Date().toLocaleString();
    const [ currentDate, currentTime ] = today.split(', ');
    const todayTime = currentTime.split(':');
    const todayHour = Number(todayTime[0]);
    const todayMinutes = Number(todayTime[1]);

    // eslint-disable-next-line no-console, max-len
    console.log({ date, time, today, todayHour, currentHours, currentMinutes, todayMinutes });
    // eslint-disable-next-line no-console
    console.log({ date, currentDate });
    if(date === currentDate &&
      (+currentHours < todayHour ||
      (+currentHours === todayHour && +currentMinutes < todayMinutes))) {
        control.get('time')?.setErrors({ isMinTime: true });
        return { isMinTime: true };
    }
    return null;
  }
}
