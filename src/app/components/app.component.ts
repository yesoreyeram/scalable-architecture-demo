import {Component, provide} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';
import {NavbarComponent} from './navbar.component';
import {ToolbarComponent} from './toolbar.component';

import {AsyncService} from '../async-services/base.async-service';
import {BpRestfulService} from '../async-services/bp-restful.async-service';

import {ROUTER_PROVIDERS, APP_BASE_HREF} from 'angular2/router';

import {provideStore} from '@ngrx/store';
import {API_URL} from '../config/config';
import {parentReducer} from '../reducers/parent.reducer';
import {ParentModel} from '../models/parent.model';

import {RestfulGateway} from '../gateways/restful.gateway';

import {HTTP_PROVIDERS} from 'angular2/http';
import {BP_HTTP} from '../channels/bp-http.channel';
import {AuthHttp, AuthConfig} from 'angular2-jwt/angular2-jwt';
import {getToken} from '../auth/token-store';

const API_SCHEMA = 'http:';
const API_HOST = 'localhost:3000';
const API_PATH = 'v1';

// const getDefaultToken = () => {
//   return btoa(JSON.stringify({
//     typ: 'JWT',
//     alg: 'none'
//   })) + '.' + btoa(JSON.stringify({
//     aud: 'guest',
//     sub: 'guest'
//   })) + '.';
// };

const providers = [
  provide(AsyncService, { useClass: BpRestfulService, multi: true }),
  ROUTER_PROVIDERS,
  HTTP_PROVIDERS,
  provideStore({ parent: parentReducer }),
  ParentModel,
  RestfulGateway,
  provide(API_URL, { useValue: `${API_SCHEMA}//${API_HOST}/${API_PATH}` }),
  provide(APP_BASE_HREF, { useValue: '<%= APP_BASE %>' }),
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
  moduleId: module.id,
  templateUrl: './app.component.html',
  directives: [ROUTER_DIRECTIVES, NavbarComponent, ToolbarComponent],
  providers
})
@RouteConfig([
  {
    path: '/',
    name: 'Home',
    loader: () => System.import('./app/+home/components/home.component').then((m: any) => m.HomeComponent)
  },
  {
    path: '/+about',
    name: 'About',
    loader: () => System.import('./app/+about/components/about.component').then((m: any) => m.AboutComponent)
  }
])
export class AppComponent {}
