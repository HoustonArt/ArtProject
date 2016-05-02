import {Injectable} from 'angular2/core';

@Injectable()
export class DatabaseService {
    private ref: any;
    private authData: any;
    private _num: string;
    private _data: any;

    constructor(){
        this.ref = new Firebase("https://artlike.firebaseIO.com/");
    }


    pushToDatabase(path:string, data:any){
        return Promise.resolve(this.ref.child(path).push(data, ()=>{}).then((_ref)=>{
                return Promise.resolve(_ref);
            })
        );
    }

    checkChildNumber(path:string){
        var _num;
        return Promise.resolve(this.ref.child(path).once("value", (data) =>{
            _num = data.numChildren();
            }).then(()=>{
                return Promise.resolve(_num);
            })
        );
    }



    getObject(path:string){
        var _data;
        return Promise.resolve(this.ref.child(path).once("value", (data)=>{
            _data = data.val();
            }).then(()=>{
                return Promise.resolve(_data);
            })
        );
    }

    getAllChildren(path: string){
        var _data = [];
        var _retData;
        return Promise.resolve(this.ref.child(path).once('value',(snap)=>{
            snap.forEach((childSnap)=>{
                var _snap = childSnap.val();
                _snap['_id']= childSnap.key();
                _data.push(_snap);
            });
        }).then(()=>{
            _retData = _data;
            return Promise.resolve(_retData);
        }));
    }

}
