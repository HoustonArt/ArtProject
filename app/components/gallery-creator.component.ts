import {Component} from 'angular2/core';
import {Artist} from '../../app/artist';
import {ArtistService} from '../../app/artists.service';
import {ArtPiece} from '../../app/art-piece';
import {Gallery} from '../../app/gallery';
import {ROUTER_DIRECTIVES, RouterLink, Router} from 'angular2/router';

@Component({
  selector: 'gallery-creator',
  templateUrl: './partials/gallery-creator.html',
  styles: [`
    .ng-valid[required] {
  border-left: 5px solid #42A948;
    }

.ng-invalid {
  border-left: 5px solid #a94442;
}`],
  directives: [ROUTER_DIRECTIVES, RouterLink],
  providers: [ArtistService],
})



export class GalleryCreatorComponent {
  public router: Router;
  public works: ArtPiece[];
  public displayedWorks: ArtPiece[];
  public galleryWorks:ArtPiece[] = [];
  public preview:number;
  public model = new Gallery(2, '', '', '');
  public Artists: Artist[];

  public artheight:number[] = [200,120,340,250,500,450];
  public containHeight:number = 340;
  public picHeight:number = 250;

  constructor(private _artistService: ArtistService, router: Router) {
    this.router = router;
  }

  setHeights(size){
    if (size == 'sm'){
      this.containHeight = 200;
      this.picHeight = 120;
    }
    else if (size == 'lg'){
      this.containHeight = 580;
      this.picHeight = 500;
    }
    else {
      this.containHeight = 300;
      this.picHeight = 220;
    }
  }
  getWorks() {
    this._artistService.getAllWorks().then(works =>this.works=works).then(works=>this.displayedWorks=works);
  }
  getArtists() {
    this._artistService.getArtists().then(Artists => this.Artists=Artists);
  }
  ngOnInit() {
    this.getWorks();
    this.getArtists();
  }


  //create link to page.  Fill spaces with %characters.  Separate fields with @
  createPage(){
    var url = this.model.stringify();
    url = url + "@" + this.containHeight + "@" + this.picHeight;
    for(var i=0;i < this.galleryWorks.length;i++){
      url = url + "@" + this.galleryWorks[i]['_id'].replace(/\s/g,"%");
    }
    console.log(url);

  }
  //filter artists when selected by first and last name
  //should make this by id at some point.....
  filterArtists(artist){
        if (artist == 'All'){
          this.displayedWorks = this.works;
        }
        else{
          var fn = artist.split(",")[1].trim();
          var ln = artist.split(",")[0].trim();
          this.displayedWorks = this.works.filter(a => a.artist_fname == fn && a.artist_lname == ln);
        }
    }
    //remove work from gallery works if button is clicked
    removeWork(work){
      this.galleryWorks = this.galleryWorks.filter(a => a != work);
    }
    //what to do if selected
    onSelect(work){
      this.galleryWorks.push(work);
    }
    //setup preview modal
    previewPage(){
      this.preview = 1;
    }
    //exit from preview
    exitPreview(){
      this.preview = 0;
    }

}
