import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {DatePipe} from 'angular2/common';
import {Message} from '../../app/message';
import {DatabaseService} from '../../app/services/database.service';
import {LoginService} from '../../app/services/login.service';

@Component({
    selector:'message-write',
    templateUrl:'./partials/message-write.html',
    styles:[ `.ng-valid[required] {
    border-left: 5px solid #42A948;
      }

  .ng-invalid {
    border-left: 5px solid #a94442;
  }`]
})
export class MessageWriter {
    @Input() oldmessage: Message;
    @Output() myevent: EventEmitter<any> = new EventEmitter();
    public newMessage: Message = new Message('','','','','','','');

    constructor(){
      console.log(this.oldmessage);
      //this.newMessage.sender_id = this.oldmessage.receiver_id;
      //this.newMessage.receiver_id = this.oldmessage.sender_id;
      //this.newMessage.subject = 'Re' + this.oldmessage.subject;
    }

    onSubit(){
      console.log(this.newMessage);
    }

}


@Component({
  selector:'messages',
  templateUrl: './partials/messages.html',
  styles:[`
   li:hover{background-color:#d3d3d3;}
  `],
  providers:[DatabaseService,LoginService, DatePipe],
  directives:[MessageWriter]
})
export class MessagesComponent{
    private uid: string;
    private messages: Message[];
    public currentMessage:Message;
    private writeReply:boolean = false;

    constructor(private _databaseService: DatabaseService,
                private _loginService: LoginService) {
        this._loginService.getUID().then((snap)=>{
            this.uid = snap['uid'];
            this._databaseService.getAllChildren('messages/' + this.uid).then((mes)=>{
                this.messages = mes;
                this.currentMessage = this.messages[0];
                this.messages[0].style = 'active';
            });
        });
    }

    changeMessage(mes){
        this.currentMessage.style = '';
        mes.style = 'active';
        this.currentMessage = mes;
    }

}
