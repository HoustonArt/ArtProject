export class Message {
  constructor(
    public sender_id: string,
    public receiver_id: string,
    public sender_name: string,
    public subject: string,
    public content:string,
    public date: number,
    public _id: string,
    public style?:string
  ) { }
}
