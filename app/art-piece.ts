interface stringArray {
  [i: number]: string;
}

export interface ArtPiece{

  name :string;
  media: string;
  price: string;
  _id: string;
  description: string;
  keywords: stringArray;
  mainFile: string;
  files : stringArray;
  artist_fname: string;
  artist_lname:string;
  arist_id:string;
  numFiles:number;
}


export class Work{
  constructor(
    public name:string,
    public media: string,
    public price: string,
    public _id: string,
    public description: string,
    public keywords: stringArray,
    public mainFile: string,
    public files : stringArray,
    public artist_fname: string,
    public artist_lname:string,
    public arist_id:string,
    public numFiles:number
  ){}
}
