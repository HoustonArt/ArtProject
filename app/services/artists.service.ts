import {Artist} from '../../app/artist';
import {ArtPiece} from '../../app/art-piece';
import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';

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

//needs to modify answer
function get_elements(id_list,arr,_ans){
     for(var i =0; i < id_list.length;i++){
         for (var j=0; j< arr.length;j++){
             if (id_list[i] == arr[j]._id){
                 _ans.push(arr[j]);
                 break;
             }
         }
     }
     return _ans;
 }

@Injectable()
export class ArtistService {
  public artist: Artist;
  public work: ArtPiece;
  public ARTISTS: Artist[] = [];
  public WORKS = [];
  public _Works = [];
  public base: any;


  constructor(){
      this.base = firebase.database().ref().child('users');
  }

  getAllWorks(): any{
    var workArr = [];
    return this.base.once("value", (snapShot)=>{
      snapShot.forEach((snapShotChild)=>{
        if(snapShotChild.hasChild('Works')){
          snapShotChild.child('Works').forEach((work) => {
            this.work = work.val();
            this.work['_id'] = work.key;
            workArr.push(this.work);
          });
        }
      });
    }).then(()=> {
        return Promise.resolve(shuffle(workArr));
    });
  }

  getSomeWorks(num:number){
    return this.getAllWorks().then((works)=> {
        return Promise.resolve(works.slice(0,num));
    });
  }


  getArtists() {
    return this.base.once("value", (snapShot)=>{
      snapShot.forEach((snapShotChild)=>{
        if(snapShotChild.hasChild('Works') || snapShotChild.hasChild('Galleries')){
           this.ARTISTS.push(snapShotChild.val());
        }
      });
    }).then(() => {
        return Promise.resolve(shuffle(this.ARTISTS));
        });
  }


 getWorkList(work_id){
    return this.getAllWorks().then((works)=> {
        return Promise.resolve(get_elements(work_id,works,[]));
    });
  }


  getMaxNumGalleries(uid){
    var numGals = 15;
    return Promise.resolve(numGals);
  }

  getMaxNumWorks(uid):any{
    var numWorks:number = 15;
    return Promise.resolve(numWorks);
  }

 }
