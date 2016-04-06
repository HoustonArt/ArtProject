interface stringArray {
  [i: number]: string;
}

export interface ArtPiece{
  name:string;
  media: string;
  price: string;
  _id: string;
  description: string;
  keywords: stringArray;
  mainFile: string;
  files: stringArray;
  artist_fname: string;
  artist_lname:string;
  artist_id:string;
  numFiles:number;
  length: string;
  depth: string;
}
