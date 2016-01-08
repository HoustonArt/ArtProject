import {Component} from 'angular2/core';
import {Artist} from './artist';
import {ArtistDetailComponent} from './artist-detail.component';
import {ArtistService} from './artists.service'

@Component({
  selector: 'my-app',
  template:`
    <h1>{{title}}</h1>
    <h2>Meet the Artists</h2>
    <ul class="artists">
      <li *ngFor="#artist of artists"
        [class.selected]= "artist === selectedArtist"
        (click)="onSelect(artist)">
        <span class="badge">{{artist.id}}</span> {{artist.name}}
      </li>
    </ul>
    <artist-detail [artist] = "selectedArtist" ></artist-detail>
  `,
  styleUrls:['./app/main.css'],
  directives: [ArtistDetailComponent],
  providers: [ArtistService]
})

export class AppComponent {
  public title = 'Houston Artists';
  public artists: Artist[];
  public selectedArtist: Artist;

  constructor(private _artistService: ArtistService){ }
  getArtists() {
    this._artistService.getArtists().then(artists => this.artists = artists);
  }

  ngOnInit() {
    this.getArtists();
  }

  onSelect(artist: Artist) {this.selectedArtist = artist;}
}
