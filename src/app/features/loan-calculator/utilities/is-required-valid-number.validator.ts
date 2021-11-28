import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { BelowMaximum, BelowMinimum, NotNumeric, Required } from '../models/form.labels';

export function isRequiredValidNumber(min?: number, max?: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return { error: Required };
    }

    // Accept only numeric, whole and positive numbers
    const isNumeric = /^[0-9]+$/.test(value);
    if (!isNumeric) {
      return { error: NotNumeric };
    }

    const numericValue = Number(value);

    if (min && numericValue < min) {
      return { error: BelowMinimum(min) };
    }

    if (max && numericValue > max) {
      return { error: BelowMaximum(max) };
    }

    return null;
  };
}
