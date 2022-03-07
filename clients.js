class Client{
    constructor(clientId,name,firstName,lastName,rfc,curp,creationDate){
        this.clientId= clientId;
        this.name= name;
        this.firstName= firstName;
        this.lastName= lastName;
        this.rfc= rfc;
        this.curp= curp;
        this.creationDate= creationDate
    }
}

module.exports= Client;