import { FormControl, ValidationErrors } from '@angular/forms';
import { getValidationMessage, validateFutureDateFromToday } from './validators';

describe('Validators', () => {
  it('validateFutureDateFromToday: It should return null if it is today', () => {

    const date = new Date();
    date.setHours(0, 0, 0, 0);

    const isoString = date.toISOString().split('T')[0];

    const control = new FormControl(isoString);

    const res = validateFutureDateFromToday(control);

    expect(res).toBeNull();
  });

  it('validateFutureDateFromToday: Should return null if it is tomorrow', () => {

    const date = new Date();
    date.setDate(date.getDate() + 1);
    date.setHours(0, 0, 0, 0);

    const isoString = date.toISOString().split('T')[0];

    const control = new FormControl(isoString);

    const res = validateFutureDateFromToday(control);

    expect(res).toBeNull();
  });

  it('validateFutureDateFromToday: Should return noDateInFuture if it is yesterday', () => {

    const date = new Date();
    date.setDate(date.getDate() - 1);
    date.setHours(0, 0, 0, 0);

    const isoString = date.toISOString().split('T')[0];

    const control = new FormControl(isoString);

    const res = validateFutureDateFromToday(control);

    expect(res).toEqual({ noDateInFuture: true });
  });

  it('getValidationMessage: Must return string when sending required', () => {

    const error: ValidationErrors = { required: true };

    const res = getValidationMessage(error);

    expect(typeof res).toBe('string');
  });

  it('getValidationMessage: Must return string when sending unmapped error', () => {

    const error: ValidationErrors = { other: true };

    const res = getValidationMessage(error);

    expect(typeof res).toBe('string');
  });
});
