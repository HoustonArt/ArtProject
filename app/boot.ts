/// <reference path="../node_modules/angular2/typings/browser.d.ts" />
import {bootstrap} from 'angular2/platform/browser';
import {AppComponent} from './components/app.component';
import {provide} from 'angular2/core';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {LocationStrategy, HashLocationStrategy} from 'angular2/platform/common'
bootstrap(AppComponent, [ROUTER_PROVIDERS,
              provide(LocationStrategy, {useClass: HashLocationStrategy})]);
