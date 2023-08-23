import { FormControl, ValidationErrors } from '@angular/forms';

export const validateDateInFuture = (control: FormControl) => {

  if (!control.value) return null

  const dateControl: number[] = control.value.split('-').map(Number);

  const dateNow = new Date();
  const date = new Date(dateControl[0], dateControl[1] - 1, dateControl[2]);

  dateNow.setHours(0, 0, 0, 0);

  if (dateNow <= date) return null;

  return { noDateInFuture: true };
}

export const validateMessages: ValidationErrors = {
  idExists: 'ID ya existe',
  required: 'Campo obligatório',
  minlength: ({ requiredLength }: { requiredLength: number }) => `Mínimo de ${requiredLength} carácteres`,
  maxlength: ({ requiredLength }: { requiredLength: number }) => `Máximo de ${requiredLength} carácteres`,
  noDateInFuture: 'Fecha no puede ser antes de hoy'
}

export const getValidationMessage = (error: ValidationErrors): string => {
  const errorKeys = Object.keys(error);
  let messages: string = '';

  errorKeys.forEach((errorName: string) => {
    const validationMessage = validateMessages[errorName];
    if (typeof validationMessage === 'function') {
      messages = validationMessage(error[errorName]);
    } else {
      messages = validationMessage;
    }
  });

  return messages;
}
