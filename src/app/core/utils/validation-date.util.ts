import { AbstractControl, ValidatorFn } from "@angular/forms";

export default class ValidationDate {
  static validate(controlDate: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlDate)?.value.split('-');
      const dateSelected = new Date(control[0], control[1] - 1, control[2])
        .setHours(0,0,0,0);
      const today = new Date().setHours(0,0,0,0);

      if(dateSelected < today) {
        controls.get(controlDate)?.setErrors({ isMin: true });
        return { isMin: true };
      } else {
        return null;
      }
    };
  }
}
