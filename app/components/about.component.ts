//import {Component} from 'angular2/core';
import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, RouterLink,Router} from 'angular2/router';

@Component({
  selector: 'about',
  templateUrl : './partials/about.html',
  directives: [ROUTER_DIRECTIVES, RouterLink],
})


export class AboutComponent {}
