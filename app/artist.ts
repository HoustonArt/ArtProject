import {ArtPiece} from './art-piece';
interface ArtPieceArray {
  [i: number]: ArtPiece;
}
export interface Artist{
   id: string;
   firstName: string;
   lastName: string;
   locationCity: string;
   locationState: string;
   media: string;
   numWorks:string;
   works: ArtPieceArray;
   profilePic: string;
}
