import {Component, Input, HostListener, Inject, forwardRef} from 'angular2/core';
import {DropDownContComponent} from './drop-down-cont.component';

@Component({
  selector: 'dd-item',
  template: `<div>{{text}}</div>`,
  styles: [`
    div {
      transition: background 0.2s ease;
      padding: 10px 15px;
    }

    div:hover { background: #999; color: #FFF; }
  `]
})
export class DropDownItemComponent {
  @Input() value: string;
  @Input() text: string;

  constructor(@Inject(forwardRef(() => DropDownContComponent)) private _parent: DropDownContComponent) {}

  @HostListener('click')
  onItemClick(): void {
    this._parent.emitOnChangeEvent(this);
  }
}
