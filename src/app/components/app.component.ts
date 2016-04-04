import {Component, provide} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';
import {NavbarComponent} from './navbar/navbar.component';
import {ToolbarComponent} from './toolbar/toolbar.component';

import {AsyncService} from '../async-services/base.async-service';
import {BpRestfulService} from '../async-services/bp-restful-service/bp-restful.async-service';

import {ROUTER_PROVIDERS, APP_BASE_HREF} from 'angular2/router';

import {provideStore} from '@ngrx/store';
import {API_URL, API_SCHEMA, API_HOST, API_PATH} from '../config/config';
import {parentReducer} from '../reducers/parent.reducer';
import {ParentModel} from '../models/parent.model';

import {RestfulGateway} from '../gateways/restful.gateway';

import {HTTP_PROVIDERS} from 'angular2/http';
import {BP_HTTP} from '../channels/bp-http.channel';
import {AuthHttp, AuthConfig} from 'angular2-jwt/angular2-jwt';
import {getToken} from '../auth/token-store.auth';
import {kidReducer} from '../reducers/kid.reducer';
import {KidsCollectionModel} from '../models/kids-collection.model';
import {BP_RESTFUL_COMMAND_BUILDERS, CommandBuilders} from '../async-services/bp-restful-service/command-builders/index';
import DropDownDirectives from './drop-down/index';

const providers = [
  provide(AsyncService, { useClass: BpRestfulService, multi: true }),
  ROUTER_PROVIDERS,
  HTTP_PROVIDERS,
  provideStore({ parent: parentReducer, kids: kidReducer }),
  ParentModel,
  KidsCollectionModel,
  RestfulGateway,
  provide(API_URL, { useValue: `${API_SCHEMA}//${API_HOST}/${API_PATH}` }),
  provide(APP_BASE_HREF, { useValue: '<%= APP_BASE %>' }),
  provide(BP_RESTFUL_COMMAND_BUILDERS, {
    useValue: CommandBuilders
  }),
  provide(AuthConfig, {
    useValue: new AuthConfig({
      noJwtError: 'No JWT',
      tokenName: 'bp-auth-token',
      tokenGetter: () => getToken('bp-auth-token')
    })
  }),
  provide(BP_HTTP, { useClass: AuthHttp })
];

@Component({
  selector: 'sd-app',
  templateUrl: './app/components/app.component.html',
  directives: [ROUTER_DIRECTIVES, NavbarComponent, ToolbarComponent, DropDownDirectives],
  providers
})
@RouteConfig([
  {
    path: '/',
    name: 'Home',
    loader: () => System.import('app/+home').then((m: any) => m.HomeComponent)
  },
  {
    path: '/+about',
    name: 'About',
    loader: () => System.import('app/+about').then((m: any) => m.AboutComponent)
  }
])
export class AppComponent {
  foo: string;
  constructor() {
    setInterval(() => {
      console.log(this.foo);
    }, 1000);
  }
}
