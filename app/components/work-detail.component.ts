import {Component} from 'angular2/core';
import {Artist} from '../../app/artist';
import {RouteParams,Location,RouterLink} from 'angular2/router';
import {ArtistService} from '../../app/artists.service';
import {ArtPiece} from '../../app/art-piece';
import {NgStyle} from 'angular2/common';

@Component({
  selector: 'work-detail',
  templateUrl : './partials/work.html',
  inputs: ['work'],
  providers: [ArtistService],
  directives: [RouterLink, NgStyle]
})

export class WorkDetailComponent {
  public work: ArtPiece;
  public artist: Artist;
  id: string;
  path1: string;
  path2: string;
  public location: Location;

constructor(params:RouteParams,location:Location, public _artistService: ArtistService){
  this.location = location;
}

getWork() {
  this._artistService.getWork(this.path1, this.path2).then(work => this.work = work);
}
getArtist() {
  this._artistService.getArtist(this.path1).then(artist => this.artist = artist);
}

ngOnInit() {
  var path = this.location.path().split('/').slice(-1).pop()
  this.path1 = path.split('-')[0];
  this.path2 = path.split('-').slice(-1).pop();
  this.getWork();
  this.getArtist();
}
}