import {Artist} from './artist';
import {ArtPiece} from './art-piece';
import {ARTISTS} from './artist-information';
import {Injectable} from 'angular2/core'
function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex ;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }
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
  getOneWork(id:string){
    for (var i =0;i <ARTISTS.length;i++){
      var numWorks = parseInt(ARTISTS[i].numWorks);
      for (var j=0; j < numWorks ;j++){
          if(ARTISTS[i].works[j]['_id'] == id){
            return Promise.resolve(ARTISTS[i].works[j]);
          }
      }

    }
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
    return Promise.resolve(this.work);
  }
  getAllWorks(){
    var WORKS = [];
    for (var i=0; i<ARTISTS.length;i++){
      for (var j=0; j < parseInt(ARTISTS[i]['numWorks']); j++){
        WORKS.push(ARTISTS[i]['works'][j]);
      }
    }
    //
    return Promise.resolve(shuffle(WORKS));
  }
}
