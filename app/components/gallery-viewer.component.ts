import {Component} from 'angular2/core';
import {Artist} from '../../app/artist';
import {DatabaseService} from '../../app/services/database.service';
import {ArtPiece} from '../../app/art-piece';
import {Gallery} from '../../app/gallery';
import {ROUTER_DIRECTIVES, RouterLink, Router} from 'angular2/router';
import {Location} from 'angular2/platform/common';


@Component({
  selector: 'gallery-viewer',
  templateUrl: './partials/gallery-viewer.html',
  directives: [ROUTER_DIRECTIVES, RouterLink],
  providers: [DatabaseService],
})



export class GalleryViewerComponent {
  public location: Location;
  public containHeight:number = 340;
  public picHeight:number = 250;
  public model: Gallery;
  public galleryWorks:ArtPiece[];


  constructor(private _databaseService: DatabaseService, location:Location) {
    this.location=location;
  }

 ngOnInit(){
   var path = this.location.path().split('/').pop();
   this._databaseService.getObject('Galleries/' + path).then((data)=>{
       this.model = data;
   });
 }
   
}
