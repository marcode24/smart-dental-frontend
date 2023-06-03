import { FormControl, FormGroup } from "@angular/forms";

import { CustomValidators } from "./custom-validators.util";

describe('Custom Validators Util', () => {
  describe('validate date function', () => {
    it('should return "null" if date is valid', () => {
      const currentDate = new Date().toISOString().split('T')[0];
      const group = new FormGroup({
        date: new FormControl(currentDate),
      });
      const result = CustomValidators.validateDate(group);

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
      const result = CustomValidators.validateDate(group);

      expect(result).toEqual({ isMin: true });
    });

    it('should return an error if date field was not found', () => {
      const group = new FormGroup({
        field: new FormControl('other field'),
      });
      const result = () => CustomValidators.validateDate(group);

      expect(result).toThrowError('date field not found');
    });
  });

  describe('validate time function', () => {
    it('should return "null" if date and time are valid', () => {
      const [ date, time ] = new Date()
        .toLocaleString()
        .split(', ');
      const group = new FormGroup({
        date: new FormControl(date),
        time: new FormControl(time),
      });
      const result = CustomValidators.validateTime(group);

      expect(result).toBeNull();
    });

    it('should return "isMinTime" if date is today and time is min than now', () => {
      // eslint-disable-next-line prefer-const
      let [ date, time ] = new Date()
        .toLocaleString()
        .split(', ');
      date = date.split('/').reverse().join('-');
      const currentTimeSplitted = time.split(':');
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
        date: new FormControl(date),
        time: new FormControl(newTime),
      });
      const result = CustomValidators.validateTime(group);

      expect(result).toEqual({ isMinTime: true });
    });

    it('should return an error if date or time fields were not found', () => {
      const group = new FormGroup({
        field: new FormControl('other field'),
        other: new FormControl('other field'),
      });

      const result = () => CustomValidators.validateTime(group);

      expect(result).toThrowError('date or time field not found');
    });
  });

  describe('validate birth date function', () => {
    it('should return "null" if birth date is valid', () => {
      const currentDate = new Date().setHours(0,0,0,0);
      const daysAgo = Math.floor(Math.random() * 25) + 1;
      const date = new Date(currentDate - (daysAgo * 86400000))
        .toISOString()
        .split('T')[0];
      const group = new FormGroup({
        birth_date: new FormControl(date),
      });
      const result = CustomValidators.validateBirthDate(group);

      expect(result).toBeNull();
    });

    it('should return "isMax" if birth date is equal or max than today', () => {
      const currentDate = new Date().setHours(0,0,0,0);
      const daysAgo = Math.floor(Math.random() * 25) + 1;
      const date = new Date(currentDate + (daysAgo * 86400000))
        .toISOString()
        .split('T')[0];
      const group = new FormGroup({
        birth_date: new FormControl(date),
      });
      const result = CustomValidators.validateBirthDate(group);

      expect(result).toEqual({ isMax: true });
    });

    it('should return an error if birth date field was not found', () => {
      const group = new FormGroup({
        field: new FormControl('other field'),
      });
      const result = () => CustomValidators.validateBirthDate(group);

      expect(result).toThrowError('birth date field not found');
    });
  });
});
