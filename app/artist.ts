import {ArtPiece} from './art-piece';
import {Gallery} from './gallery';

interface ArtPieceArray {
  [i: number]: ArtPiece;
}
interface GalleryArray {
  [i: number]: Gallery;
}

export interface Artist{
   id: string;
   firstName: string;
   lastName: string;
   locationCity: string;
   locationState: string;
   media: string;
   numWorks:string;
   Works: ArtPieceArray;
   profilePic: string;
   description: string;
}


export interface GalleryArtist{
   id: string;
   firstName: string;
   lastName: string;
   locationCity: string;
   locationState: string;
   media: string;
   numWorks:string;
   Works: ArtPieceArray;
   profilePic: string;
   description: string;
   Galleries: GalleryArray;
}
