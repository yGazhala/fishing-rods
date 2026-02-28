import { Component, computed, input, InputSignal } from '@angular/core';
import { BaseInput } from '../utils/base-input';
import { FieldTree, FormField, ValidationError } from '@angular/forms/signals';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';

@Component({
  selector: 'app-input-number',
  imports: [MatError, MatFormField, MatInput, MatLabel, FormField],
  templateUrl: './input-number.html',
  styleUrl: './input-number.scss',
})
export class InputNumber extends BaseInput<number | null> {
  public label = input<string>();
  public field = input.required<FieldTree<number | null>>();

  protected formField = computed(() => {
    const field = this.field();
    return field as FieldTree<number>;
  });

  protected minValue = computed(() => {
    const fieldState = this.fieldState();
    return fieldState.min?.();
  });

  protected isMinErrorShown = computed(() => {
    const minValue = this.minValue();
    if (typeof minValue !== 'number') {
      return false;
    }

    const fieldState = this.fieldState();
    const isTouched = fieldState.touched();
    const isInvalid = fieldState.invalid();
    const errors = fieldState.errors();
    const hasMinError = !!errors.find((error) => {
      return error.kind === 'min';
    });
    return isTouched && isInvalid && hasMinError;
  });
}
