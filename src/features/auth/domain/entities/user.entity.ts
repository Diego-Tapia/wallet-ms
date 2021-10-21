export class User {
   
    custom_id: string;
    username: string;
    status: string;
    client_id: string;
    _id?:string;


    constructor(
        custom_id: string,
        username: string,
        status: string,
        client_id: string,
        _id?:string,

    ) {
        
        this.custom_id = custom_id;
        this.username = username;
        this.status = status;
        this.client_id = client_id;
        this._id=_id
    }
}
