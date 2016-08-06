import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {DatePipe} from 'angular2/common';
import {Message} from '../../app/message';
import {DatabaseService} from '../../app/services/database.service';
import {LoginService} from '../../app/services/login.service';

@Component({
    selector:'message-write',
    templateUrl:'./partials/message-write.html',
    providers:[DatabaseService],
    styles:[ `.ng-valid[required] {
    border-left: 5px solid #42A948;
      }
  .ng-invalid {
    border-left: 5px solid #a94442;
  }`]
})
export class MessageWriter {
    @Input() rec_id: string;
    @Input() sender_id: string;
    @Input() subject: string = '';
    @Output() myevent: EventEmitter<any> = new EventEmitter();
    public newMessage: Message = new Message('','','','','',0,'','');
    public notSubmitted:boolean = true;

    constructor(private _databaseService: DatabaseService){}

    ngOnInit(){
      this.newMessage.sender_id = this.sender_id;
      this.newMessage.receiver_id = this.rec_id;
      if(this.subject != ''){
        this.newMessage.subject = 'Re: ' + this.subject;
      }
    }

    onSubmit(){
      this.newMessage.date = Date.now();
      this._databaseService.pushToDatabase('messages/' + this.newMessage.receiver_id + '/received/',
        this.newMessage)

      this._databaseService.pushToDatabase('messages/' + this.newMessage.sender_id + '/sent/',
        this.newMessage).then((err)=>{
            this.myevent.emit(null)
            this.notSubmitted = false;
        });
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
    private sentMessages: Message[];
    public currentMessage:Message;
    public currentSentMessage: Message;
    public noMessage:boolean;
    public noSentMessage:boolean;

    constructor(private _databaseService: DatabaseService,
                private _loginService: LoginService) {
        this._loginService.getUID().then((snap)=>{
            this.uid = snap['uid'];
            this._databaseService.getAllChildren('messages/' + this.uid +'/received/').then((mes)=>{
                if (mes[0]){
                    this.messages = mes;
                    this.currentMessage = this.messages[0];
                    this.messages[0].style = 'active';
                    this.noMessage = false;
                }else{
                    this.noMessage = true;
                }
            });
            this._databaseService.getAllChildren('messages/' + this.uid +'/sent/').then((mes)=>{
                if (mes[0]){
                    this.sentMessages = mes;
                    this.noSentMessage = false
                    this.sentMessages[0].style = 'active';
                    this.currentMessage = this.sentMessages[0];
                }else{
                    this.noSentMessage = true;
                }
            });
        });
    }

    ngOnInit(){
      if (this.messages){
        this.changeMessage(this.messages[0]);
      }else{
        this.currentMessage = null;
      }
    }


    changeMessage(mes){
        this.currentMessage.style = '';
        mes.style = 'active';
        this.currentMessage = mes;
    }

}
