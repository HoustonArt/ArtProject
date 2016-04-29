import {ArtPiece} from './art-piece';


export class GalleryContainer {
  constructor(
    public info: Gallery,
    public works: ArtPiece[]
  ) { }

}
export class Gallery {
  constructor(
    public user_id: string,
    public id: string,
    public name: string,
    public curator: string,
    public info?: string
  ) { }
}
