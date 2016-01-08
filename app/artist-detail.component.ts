import {Component} from 'angular2/core';
import {Artist} from './artist';

@Component({
  selector: 'artist-detail',
  template: `
  <div *ngIf = "artist">
    <h2> {{artist.name}}</h2>
    <div><label> id:</label> {{artist.id}}</div>
    <div><ul>
      <li *ngFor="#work of artist.works">
        {{work.name}}
      </li>
    </ul></div>
  </div>`,
    inputs: ['artist']
  })

export class ArtistDetailComponent {
  public artist: Artist;
}
