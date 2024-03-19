export class GenerateBillReport {
    private username: string;
    private logincount: string;
    private totalduration: string;

    constructor(usernameVal: string, logincountVal: string, totaldurationVal: string) {
        this.username = usernameVal;
        this.logincount = logincountVal;
        this.totalduration = totaldurationVal;
    }
}