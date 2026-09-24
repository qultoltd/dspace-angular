import { UntypedFormControl } from '@angular/forms';
import {
  DynamicCheckboxModel,
  DynamicFormControlModel,
  DynamicInputModel,
} from '@ng-dynamic-forms/core';

import { dsDynamicErrorMessagesMatcher } from './ds-dynamic-error-messages-matcher';
import { DynamicCustomSwitchModel } from './models/custom-switch/custom-switch.model';

describe('dsDynamicErrorMessagesMatcher', () => {
  const inputModel = new DynamicInputModel({ id: 'title' });
  const checkboxModel = new DynamicCheckboxModel({ id: 'granted' });
  const switchModel = new DynamicCustomSwitchModel({ id: 'toggle' });

  const match = (model: DynamicFormControlModel, touched: boolean, hasFocus: boolean): boolean => {
    const control = new UntypedFormControl();
    if (touched) {
      control.markAsTouched();
    }
    return dsDynamicErrorMessagesMatcher(control, model, hasFocus);
  };

  it('should not show error messages on an untouched control', () => {
    expect(match(inputModel, false, false)).toBeFalse();
    expect(match(checkboxModel, false, false)).toBeFalse();
  });

  it('should show error messages on a touched control that is not focused', () => {
    expect(match(inputModel, true, false)).toBeTrue();
    expect(match(checkboxModel, true, false)).toBeTrue();
  });

  it('should hide the error message of a focused input, so typing is not interrupted', () => {
    expect(match(inputModel, true, true)).toBeFalse();
  });

  it('should keep the error message of a focused checkbox, so the control does not move under the mouse between mousedown and mouseup', () => {
    expect(match(checkboxModel, true, true)).toBeTrue();
  });

  it('should keep the error message of a focused custom switch', () => {
    expect(match(switchModel, true, true)).toBeTrue();
  });
});
