import { AbstractControl } from '@angular/forms';
import {
  DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX,
  DynamicErrorMessagesMatcher,
  DynamicFormControlModel,
} from '@ng-dynamic-forms/core';

import { DYNAMIC_FORM_CONTROL_TYPE_CUSTOM_SWITCH } from './models/custom-switch/custom-switch.model';

/**
 * Like the library default (`control.touched && !hasFocus`), except that a checkbox keeps showing its
 * error message while focused.
 *
 * Hiding it on focus removes an element from the control, which moves the checkbox between the user's
 * mousedown and mouseup; the browser then fires no click at all and the box only ticks on the second
 * attempt. Suppressing the message while the user works on a field only makes sense where there is
 * typing to interrupt, and a checkbox has none.
 */
export const dsDynamicErrorMessagesMatcher: DynamicErrorMessagesMatcher =
  (control: AbstractControl, model: DynamicFormControlModel, hasFocus: boolean) =>
    control.touched && (!hasFocus || isCheckboxLike(model));

function isCheckboxLike(model: DynamicFormControlModel): boolean {
  return model?.type === DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX || model?.type === DYNAMIC_FORM_CONTROL_TYPE_CUSTOM_SWITCH;
}
