import {Component} from 'angular2/core';
import {Artist} from './artist';

@Component({
  selector: 'artist-detail',
  template: `
  <div *ngIf = "artist">
    <h2> {{artist.firstName}} {{artist.lastName}}</h2>
    <ul class = "works">
      <li *ngFor="#work of artist.works">
        <img src= {{work.mainFile}} alt= {{work.description}}  width = "200">
        {{work.name}}
      </li>
    </ul>
  </div>`,
    styleUrls:['./app/main.css'],
    inputs: ['artist']
  })

export class ArtistDetailComponent {
  public artist: Artist;
}
