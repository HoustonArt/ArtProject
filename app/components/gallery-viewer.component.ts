import {Component} from 'angular2/core';
import {Artist} from '../../app/artist';
import {ArtistService} from '../../app/artists.service';
import {ArtPiece} from '../../app/art-piece';
import {Gallery} from '../../app/gallery';
import {ROUTER_DIRECTIVES, RouterLink, Router} from 'angular2/router';
import {Location} from 'angular2/platform/common';


@Component({
  selector: 'gallery-viewer',
  templateUrl: './partials/gallery-viewer.html',
  directives: [ROUTER_DIRECTIVES, RouterLink],
  providers: [ArtistService],
})



export class GalleryViewerComponent {
  public location: Location;
  public containHeight:number = 340;
  public picHeight:number = 250;
  public model: Gallery;
  public galleryWorks:ArtPiece[];
  public loading:number = 1;


  constructor(private _artistService: ArtistService, location:Location) {
    this.location=location;
  }

 ngOnInit(){
   var path = this.location.path();
   path = path.slice(14,path.length);
   path = path.replace(/%/g,' ');
   var info = path.split('@');
   this.model = new Gallery(2,info[0],info[1],'')
   this.containHeight= parseInt(info[2])
   this.picHeight = parseInt(info[3])
   var pics = info.slice(4,info.length);
  
   this._artistService.getWorkList(pics).then(works => this.galleryWorks = works);
   }
}
