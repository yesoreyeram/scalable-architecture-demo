/* tslint:disable: no-empty */
import {
  Query,
  Directive,
  forwardRef,
  Provider,
  QueryList, HostListener
} from 'angular2/core';

import {ObservableWrapper} from 'angular2/src/facade/async';
import {CONST_EXPR} from 'angular2/src/facade/lang';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from 'angular2/common';
import {DropDownContComponent} from './drop-down-cont.component';

const SELECT_VALUE_ACCESSOR = CONST_EXPR(new Provider(
  NG_VALUE_ACCESSOR, {useExisting: forwardRef(() => DropDownValueAccessor), multi: true}));

@Directive({selector: 'dd-item'})
export class DropDownItem {
}

/**
 * The accessor for writing a value and listening to changes on a select element.
 */
@Directive({
  selector: 'dd-container[ngControl],dd-container[ngFormControl],dd-container[ngModel]',
  providers: [SELECT_VALUE_ACCESSOR]
})
export class DropDownValueAccessor implements ControlValueAccessor {
  value: string;

  @HostListener('change', ['$event.value']) onChange = (_: any) => {};
  @HostListener('blur') onTouched = () => {};

  constructor(private _dropDown: DropDownContComponent,
              @Query(DropDownItem, {descendants: true}) query: QueryList<DropDownItem>) {
    this._updateValueWhenListOfOptionsChanges(query);
  }

  writeValue(value: any): void {
    this.value = value;
    this._dropDown.value = value;
  }

  registerOnChange(fn: () => any): void { this.onChange = fn; }
  registerOnTouched(fn: () => any): void { this.onTouched = fn; }

  private _updateValueWhenListOfOptionsChanges(query: QueryList<DropDownItem>) {
    ObservableWrapper.subscribe(query.changes, (_) => this.writeValue(this.value));
  }
}
