export class User {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public locationCity: string,
    public locationState: string,
    public description: string,
    public email: string,
    public info?: string
  ) { }

}
