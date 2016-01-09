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
}
