import {Component, Injectable} from 'angular2/core';
import {DOCS} from '../../app/docs';

@Injectable()
class DocsService{
    getDocs(){
        return Promise.resolve(DOCS);
    }
}

@Component({
  selector: 'docs',
  templateUrl: './partials/docs.html',
  styles: [`
    .zfix {
        position:fixed;
        }`],
  directives: [],
  providers:[DocsService]
})
export class DocumentationComponent{
    public dataLoaded:boolean = false;
    public header:string;
    public content:string;

    private _headers:string[] = [];
    private _contents:string[] = [];


    // create the docs from the page
    // currently assume they are local
    constructor(private _docsService: DocsService){
        this._docsService.getDocs().then((_d)=>{
            for(var i in _d){
                this._headers.push(i);
                this._contents.push(_d[i]);
            }
            this.header = this._headers[0];
            this.content = this._contents[0];
            this.dataLoaded = true;
        })
    }

    // click a link and have proper header and contents appear
    // get rid of top menu and go to side menu
    onClick(i:number){
        this.header = this._headers[i];
        this.content = this._contents[i];
    }




}
