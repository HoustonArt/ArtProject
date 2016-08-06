import {Component} from 'angular2/core';
import {Artist} from '../../app/artist';
import {ArtPiece} from '../../app/art-piece';
import {ArtistService} from '../../app/services/artists.service';
import {ROUTER_DIRECTIVES, RouterLink,Router} from 'angular2/router';
import {WorkDisplay} from './works.component';

@Component({
  selector: 'home',
  templateUrl : './partials/homepage.html',
  directives: [ROUTER_DIRECTIVES, RouterLink, WorkDisplay],
  providers: [ArtistService],
})
export class HomeComponent {
  public title = 'ArtLike';
  public artists: Artist[];
  public router: Router;
  public works: ArtPiece[];
  public isLoggedIn = false;
  public opacity:number = 1;

  constructor(private _artistService: ArtistService, router: Router){
    this.router = router;

  }


  ngOnInit() {
    this._artistService.getSomeWorks(4).then(works => this.works=works);
  }
}
