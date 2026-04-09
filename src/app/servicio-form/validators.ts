import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validador personalizado y parametrizable: verifica longitud mínima
 * Requisito 7: validación personalizada parametrizable
 */
export function longitudMinimaValidator(minLength: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;
    if (!value) return null; // Validators.required se encarga del vacío
    return value.trim().length >= minLength
      ? null
      : { longitudMinima: { requiredLength: minLength, actualLength: value.trim().length } };
  };
}
