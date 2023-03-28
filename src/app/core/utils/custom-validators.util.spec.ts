import { FormControl, FormGroup } from "@angular/forms";

import { CustomValidators } from "./custom-validators.util";

describe('Custom Validators Util', () => {
  describe('valid date function', () => {
    it('should return "null" if date is valid', () => {
      const currentDate = new Date().toISOString().split('T')[0];
      const group = new FormGroup({
        date: new FormControl(currentDate),
      });
      const result = CustomValidators.validDate(group);

      expect(result).toBeNull();
    });

    it('should return "isMin" if date is min than today', () => {
      const currentDate = new Date().setHours(0,0,0,0);
      const daysAgo = Math.floor(Math.random() * 25) + 1;
      const date = new Date(currentDate - (daysAgo * 86400000))
        .toISOString()
        .split('T')[0];
      const group = new FormGroup({
        date: new FormControl(date),
      });
      const result = CustomValidators.validDate(group);

      expect(result).toEqual({ isMin: true });
    });

    it('should return an error if date field was not found', () => {
      const group = new FormGroup({
        field: new FormControl('other field'),
      });
      const result = () => CustomValidators.validDate(group);

      expect(result).toThrowError('date field not found');
    });
  });

  describe('valid time function', () => {
    it('should return "null" if date and time are valid', () => {
      const currentDateSplitted = new Date().toISOString().split('T');
      const currentDate = currentDateSplitted[0];
      const currentTime = currentDateSplitted[1].split('.')[0];
      const group = new FormGroup({
        date: new FormControl(currentDate),
        time: new FormControl(currentTime),
      });
      const result = CustomValidators.validTime(group);

      expect(result).toBeNull();
    });

    it('should return "isMinTime" if date is today and time is min than now', () => {
      const currentDateSplitted = new Date()
        .toLocaleString()
        .replace(/\s/, '')
        .split(',');
      const currentDate = currentDateSplitted[0]
        .replace(/\//g, '-')
        .split('-')
        .reverse()
        .join('-');
      const currentTime = currentDateSplitted[1];

      const currentTimeSplitted = currentTime.split(':');
      let currentHour = Number(currentTimeSplitted[0]);
      let currentMinutes = Number(currentTimeSplitted[1]);
      if(currentMinutes - 1 <= 0) {
        currentHour--;
        currentMinutes = 59;
      } else {
        currentMinutes--;
      }

      const newTime = `${currentHour}:${currentMinutes}`;
      const group = new FormGroup({
        date: new FormControl(currentDate),
        time: new FormControl(newTime),
      });
      const result = CustomValidators.validTime(group);

      expect(result).toEqual({ isMinTime: true });
    });

    it('should return an error if date or time fields were not found', () => {
      const group = new FormGroup({
        field: new FormControl('other field'),
        other: new FormControl('other field'),
      });

      const result = () => CustomValidators.validTime(group);

      expect(result).toThrowError('date or time field not found');
    });

  });

});
