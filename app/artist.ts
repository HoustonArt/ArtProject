import {ArtPiece} from './art-piece';
export interface Artist{
   id: number;
   name: string;
   [works: number]: ArtPiece;
}
