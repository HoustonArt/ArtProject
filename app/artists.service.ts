import {Artist} from './artist';
import {ArtPiece} from './art-piece';
//import {ARTISTS} from './artist-information';
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
  public artist: Artist;
  public work: ArtPiece;
  public ARTISTS: Artist[] = [];
  public WORKS = [];

  //private ARTISTS: Artist[];
  firebaseUrl: string = "https://artlike.firebaseIO.com/users/";

  fromFirebase(){
    this.WORKS = [];
    this.ARTISTS = [];
    var base = new Firebase(this.firebaseUrl);
    base.once("value", (snapShot)=>{
      snapShot.forEach((snapShotChild)=>{
        if(snapShotChild.hasChild('Works')){
          this.ARTISTS.push(snapShotChild.val());
          snapShotChild.child('Works').forEach((work) => {
            this.work = work.val();
            this.work['_id'] = work.key();
            this.WORKS.push(this.work);
          });
        }
      });
    });
  }


  getArtists() {
    this.fromFirebase();
    return Promise.resolve(this.ARTISTS);
  }



  getAllWorks(){
    this.fromFirebase();
    return Promise.resolve(shuffle(this.WORKS));
  }
}
