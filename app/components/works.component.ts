import {Component} from 'angular2/core';
import {ArtPiece} from '../../app/art-piece';
import {ArtistService} from '../../app/artists.service';
import {ROUTER_DIRECTIVES, RouterLink,Router} from 'angular2/router';

@Component({
  selector:'all-works',
  templateUrl: './partials/all-works.html',
  providers: [ArtistService],
  directives:[ROUTER_DIRECTIVES,RouterLink]
})

export class AllWorksComponent {
  public works: ArtPiece[];

  constructor(public _artistService: ArtistService){
  }

  getWorks() {
    this._artistService.getAllWorks().then(works =>this.works=works);
  }
  ngOnInit() {
    this.getWorks();
  }

}