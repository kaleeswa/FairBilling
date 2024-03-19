export class UserData {
    private time: string;
    private name: string;   
    private status: string;

    constructor(timeval: string, nameval: string, statusval: string) {
        this.time = timeval;
        this.name = nameval;       
        this.status = statusval;
    }
    
}