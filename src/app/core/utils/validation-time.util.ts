import { AbstractControl, ValidatorFn } from "@angular/forms";

export default class ValidationTime {
  static validate(controlDate: string, controlTime: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const cDate = controls.get(controlDate)?.value.split('-');
      console.log(controls.get(controlTime)?.value);
      const cTime = controls.get(controlTime)?.value.split(':');

      const dateSelectedTime = new Date(cDate[0], cDate[1] - 1, cDate[2]).setHours(0,0,0,0);
      const today = new Date().setHours(0,0,0,0);

      const todayHour = new Date().getHours();
      const todayMinutes = new Date().getMinutes();

      const hourSelected = Number(cTime[0]);
      const minutesSelected = Number(cTime[1]);

      if(dateSelectedTime === today) {
        console.log({hourSelected, todayHour});
        if(hourSelected < todayHour) {
          controls.get(controlTime)?.setErrors({ isMinTime: true });
          return { isMinTime: true };
        } else if (hourSelected === todayHour) {
          if(minutesSelected <= todayMinutes) {
            controls.get(controlTime)?.setErrors({ isMinTime: true });
            return { isMinTime: true };
          }
        }
      }
      return null;
    }
  }

}
