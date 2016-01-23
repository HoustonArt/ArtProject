interface stringArray {
  [i: number]: string;
}

export interface ArtPiece{
  name :string;
  media: string;
  price: string;
  description : string;
  keywords: stringArray;
  mainFile: string;
  files : stringArray;
  artist_fname: string;
  artist_lname:string;
  arist_id:string;
  numFiles:number;
}
