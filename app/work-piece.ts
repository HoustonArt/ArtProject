interface stringArray {
  [i: number]: string;
}

export class WorkUpLoad{
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
    public numFiles:number,
    public length: string,
    public width: string,
    public depth: string
  ){}
}
