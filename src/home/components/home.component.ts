import {Component} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {Parent} from '../../shared/services/store/bp-store';
import {ParentModel} from '../../shared/services/models/parent.model';

@Component({
  selector: 'sd-home',
  moduleId: module.id,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES]
})
export class HomeComponent {
  parent$: Observable<Parent>;
  private email: string;
  private password: string;
  constructor(private parent: ParentModel) {}

  signUp() {
    this.parent.signUp(this.email, this.password);
    this.email = '';
    this.password = '';
  }
}
