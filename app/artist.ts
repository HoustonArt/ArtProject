import {ArtPiece} from './art-piece';
export interface Artist{
   id: string;
   firstName: string;
   lastName: string;
   locationCity: string;
   locationState: string;
   media: string;
   numWorks:string;
   [works: number]: ArtPiece;
   profilePic: string;
}
