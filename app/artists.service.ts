import {Artist} from './artist';
import {ARTISTS} from './artist-information';
import {Injectable} from 'angular2/core'

@Injectable()
export class ArtistService {
  private artist: Artist;
  getArtists() {
    return Promise.resolve(ARTISTS);
  }
  getArtist(id:string){
    for (var i =0;i<ARTISTS.length;i++){
      if (ARTISTS[i]['id'] == id){
        this.artist = ARTISTS[i];
        break
      }
    }
    return Promise.resolve(this.artist);
  }
}
