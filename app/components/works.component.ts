import {Component, Input} from 'angular2/core';
import {ArtPiece} from '../../app/art-piece';
import {ArtistService} from '../../app/services/artists.service';
import {ROUTER_DIRECTIVES, RouterLink, Router} from 'angular2/router';

@Component({
  selector:'work-display',
  template:`
  <div (mouseenter)='isHover()' (mouseleave)='notHover()' style="height:350px" class="col-lg-3 col-sm-6 text-center">
    <a  [routerLink]="['/Work', {id: work.artist_id + '@'+ work._id}]">
      <img style="max-height:{{size}}; opacity:{{opacity}}" class="img-responsive center-block" src="{{work.mainFile}}" alt="{{work.name}}">
    </a>
    <h4 *ngIf='showInfo'>{{work.name}}<small> {{work.artist_fname}} {{work.artist_lname}}</small></h4>
    </div>
  `,
  directives:[ROUTER_DIRECTIVES,RouterLink]
})
export class WorkDisplay{
  @Input('work-input') work: ArtPiece;
  @Input() opacity: number;
  public showInfo: boolean = false;
  public size:string = '250px';

  isHover(){
    this.showInfo = true;
    this.size = '275px';
    console.log(this.opacity);
  }

  notHover(){
    this.showInfo = false;
    this.size = '250px';
  }

}

@Component({
  selector:'all-works',
  templateUrl: './partials/all-works.html',
  providers: [ArtistService],
  directives:[ROUTER_DIRECTIVES,RouterLink, WorkDisplay]
})

export class AllWorksComponent {
  public works: ArtPiece[];
  public opacity:number = 1;

  constructor(public _artistService: ArtistService){
  }


  ngOnInit() {
    this._artistService.getSomeWorks(12).then(works => this.works=works);
  }

  fetchNewWorks(){
    var interval = setInterval(()=>{
      this.opacity = this.opacity-.1;
      if (this.opacity < .1){
        clearInterval(interval);
        this._artistService.getSomeWorks(12).then(works => this.works=works).then(()=>{
          this.opacity=1;
        });
      }
    },20);
  }

}
