import {Artist} from './artist';
import {ArtPiece} from './art-piece';
import {ARTISTS} from './artist-information';
import {Injectable} from 'angular2/core'

@Injectable()
export class ArtistService {
  private artist: Artist;
  private work: ArtPiece;
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
  getWork(aid: string, wid: string) {
    for (var i =0;i<ARTISTS.length;i++){
      if (ARTISTS[i]['id'] == aid){
        this.artist = ARTISTS[i];
        break
      }
    }
    var numWorks = parseInt(this.artist.numWorks);
    for (var j=0; j < numWorks ;j++){
      if (this.artist.works[j]['name']== wid){
        this.work = this.artist.works[j];
        break
      }
    }
    return Promise.resolve(this.work)
  }
}
