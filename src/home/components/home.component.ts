import {Component} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {Parent} from '../../shared/store/bp-store';
import {ParentModel} from '../../shared/models/parent.model';

@Component({
  selector: 'sd-home',
  moduleId: module.id,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES]
})
export class HomeComponent {
  parent$: Observable<Parent>;
  private email: string = 'minko@gechev.com';
  private name: string;
  private password: string = 'test';
  constructor(private parent: ParentModel) {}

  getToken() {
    this.parent.getGuestToken();
  }

  signIn() {
    this.parent.signIn(this.email, this.password);
    // this.email = '';
    // this.password = '';
  }

  signUp() {
    this.parent.signUp(this.name, this.email, this.password);
    // this.email = '';
    // this.password = '';
  }
}
