export class Gallery {
  constructor(
    public id: number,
    public name: string,
    public curator: string,
    public info?: string
  ) { }

  stringify(){
    var outstring;
    var name = this.name.replace(/\s/g,"%");
    var curator = this.curator.replace(/\s/g,"%");
    return name + '@' + curator;
  }
}
