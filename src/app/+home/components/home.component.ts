import {Component} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {Parent, Kid} from '../../store/bp.store';
import {ParentModel} from '../../models/parent.model';
import {KidsCollectionModel} from '../../models/kids-collection.model';

@Component({
  selector: 'sd-home',
  templateUrl: './app/+home/components/home.component.html',
  styleUrls: ['./app/+home/components/home.component.css'],
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES]
})
export class HomeComponent {
  parent$: Observable<Parent>;
  private email: string = 'minko@gechev.com';
  private name: string;
  private password: string = 'test';

  private kidName: string;
  private kidGender: number;
  private kidGrade: number;

  constructor(private parent: ParentModel, private kids: KidsCollectionModel) {}

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

  loadKids() {
    this.kids.loadKids();
  }
  createKid() {
    let kid = new Kid();
    kid.gender = this.kidGender;
    kid.grade = this.kidGrade;
    kid.name = this.kidName;
    this.kids.createKid(kid);
    this.kidName = '';
  }
}
