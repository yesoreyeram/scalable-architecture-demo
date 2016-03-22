import {provide, enableProdMode} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, APP_BASE_HREF} from 'angular2/router';
import {AppComponent} from './app/components/app.component';

import {provideStore} from '@ngrx/store';
import {parentReducer} from './shared/services/reducers/parent.reducer';
import {ParentModel} from './shared/services/models/parent.model';

import {CommandBuilder} from './shared/services/commands/builders/command-builder.service';
import {RestfulCommandBuilder} from './shared/services/commands/builders/restful-command-builder.service';

import {Gateway} from './shared/services/gateways/gateway.service';
import {RestfulGateway} from './shared/services/gateways/restful-gateway.service';

import {API_URL} from './shared/config/config';

import {AuthConfig} from 'angular2-jwt';
import {HTTP_PROVIDERS} from 'angular2/http';

import {RemoteService} from './shared/services/remote-services/remote-service.service';
import {RestfulService} from './shared/services/remote-services/restful-remote-service.service';

if ('<%= ENV %>' === 'prod') { enableProdMode(); }

bootstrap(AppComponent, [
  ROUTER_PROVIDERS,
  HTTP_PROVIDERS,
  provide(API_URL, { useValue: 42 }),
  provide(Gateway, { useClass: RestfulGateway }),
  ParentModel,
  provide(CommandBuilder, { useClass: RestfulCommandBuilder }),
  provideStore({ parent: parentReducer }),
  provide(APP_BASE_HREF, { useValue: '<%= APP_BASE %>' }),
  provide(AuthConfig, { useValue: {} }),
  provide(RemoteService, { useValue: RestfulService, multi: true })
]);

// In order to start the Service Worker located at "./sw.js"
// uncomment this line. More about Service Workers here
// https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
// if ('serviceWorker' in navigator) {
//   (<any>navigator).serviceWorker.register('./sw.js').then(function(registration) {
//     console.log('ServiceWorker registration successful with scope: ',    registration.scope);
//   }).catch(function(err) {
//     console.log('ServiceWorker registration failed: ', err);
//   });
// }
