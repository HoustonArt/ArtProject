import {ArtPiece} from '../../app/art-piece';

export class Gallery {
  constructor(
    public id: string,
    public name: string,
    public curator: string,
    public info?: string,
    public works?: ArtPiece[]
  ) { }

  stringify(){
    var outstring;
    var name = this.name.replace(/\s/g,"%");
    var curator = this.curator.replace(/\s/g,"%");
    return name + '@' + curator;
  }
}
