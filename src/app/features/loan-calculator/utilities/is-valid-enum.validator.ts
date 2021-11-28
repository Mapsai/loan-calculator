import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { InvalidEnum, Required } from '../models/form.labels';

export function isValidEnum(enumObj: Record<string, unknown>): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return { error: Required };
    }

    const validValues = Object.keys(enumObj);
    if (!validValues.includes(value)) {
      return { error: InvalidEnum };
    }

    return null;
  };
}
