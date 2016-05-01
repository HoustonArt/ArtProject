import {Component, Input} from 'angular2/core';
import {DatePipe} from 'angular2/common';
import {Message} from './app/message';
import {DatabaseService} from '../../app/services/database.service';
import {LoginService} from '../../app/services/login.service';

@Component({
    selector:'message-write',
    template:``
    directives:[],
    styles:[],
    providers:[]
})
export class MessageWriter {
    @Input() oldMessage: Message;
    
}


@Component({
  selector:'messages',
  templateUrl: './partials/messages.html',
  directives:[MessageWriter],
  styles:[`
   li:hover{background-color:#d3d3d3;}
  `],
  providers:[DatabaseService,LoginService, DatePipe]
})

export class MessagesComponent{
    private uid: string;
    private messages: Messages[];
    private currentMessage:Message;
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
