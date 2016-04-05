import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
  selector: 'sd-toolbar',
  moduleId: module.id,
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class ToolbarComponent {}
