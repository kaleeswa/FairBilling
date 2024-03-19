import { Component, OnInit } from '@angular/core';
import { UserData } from '../../service/FairBillingService/UserData';
import { FairBillingOutputData } from '../../service/FairBillingService/fair-billing-output-data'

@Component({
  selector: 'fair-billing-component',
  templateUrl: './fair-billing.component.html',
  styleUrls: ['./fair-billing.component.scss']
})

export class FairBillingComponent implements OnInit {
  constructor() { }

  //#region Variables Declaration
  
  BillingLogDetails: [string, string, string][] = [
    ["14:02:03", "ALICE99", "START"],
    ["14:02:05", "CHARLEE", "END"],
    ["14:02:34", "ALICE99", "END"],
    ["14:02:58", "ALICE99", "START"],
    ["14:03:02", "CHARLEE", "START"],
    ["14:03:33", "ALICE99", "START"],
    ["14:03:35", "ALICE99", "END"],
    ["14:03:37", "CHARLEE", "END"],
    ["14:04:05", "ALICE99", "END"],
    ["14:04:23", "ALICE99", "END"],
    ["14:04:41", "CHARLEE", "START"]
  ];

  user_alice: string = "ALICE99";
  user_charle: string = "CHARLEE";
  user_Status_Start: string = "START";
  user_Status_End: string = "END";

  duration: any;
  private UserdataList_alice: UserData[] = [];
  private UserdataList_Charle: UserData[] = [];
  outputdata: FairBillingOutputData[] = [];

  TotalCount: any;
  alicelogincount: any;
  charlelogincount: any;
  First_record: any = null;
  secound_record: any = null;
  count: any = 0;
  finalSeconds: any = null;

  //#endregion

  ngOnInit(): void {
    this.generateReport(this.BillingLogDetails);
  }

  public generateReport(BillingLogDetails: any) {
    for (let i = 0; i < BillingLogDetails.length; i++) {
      this.handleFairBilling(BillingLogDetails[i]);
    };

    this.ReportGenerateAlice();
    this.ReportGenerateCharle();
  }

  public handleFairBilling(BillingLogDetails: any) {
    if (BillingLogDetails[1].toString() === this.user_alice) {
      this.UserdataList_alice.push(BillingLogDetails);
    }

    if (BillingLogDetails[1].toString() === this.user_charle) {
      this.UserdataList_Charle.push(BillingLogDetails);
    }
  }

  ReportGenerateAlice() {
    this.TotalCount = this.UserdataList_alice.length;
    this.duration = this.calculateSessionTime(this.UserdataList_alice, this.user_alice);

    this.outputdata.push({
      username: this.user_alice,
      logincount: this.alicelogincount,
      totalduration: this.duration
    });
  }

  ReportGenerateCharle() {
    this.TotalCount = this.UserdataList_Charle.length;
    this.duration = "";
    this.duration = this.calculateSessionTime(this.UserdataList_Charle, this.user_charle);

    this.outputdata.push({
      username: this.user_charle,
      logincount: this.charlelogincount,
      totalduration: this.duration
    });
  }

  calculateSessionTime(outputdata: any, user: any): any {
    this.First_record = null;
    this.secound_record = null;
    this.count = null;
    this.finalSeconds = null;

    for (let i = -1; i < outputdata.length; i++) {
      this.count++;

      if (this.count < outputdata.length) {

        var hms = outputdata[i + 1][0];
        var a = hms.split(':');
        var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
        this.First_record = seconds;

        var hms = outputdata[i + 2][0];
        var a = hms.split(':');
        var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
        this.secound_record = seconds;

        this.finalSeconds += this.secound_record - this.First_record;

      }

    };

    let count_a: any = 0;
    let filterval: number = 0;
    this.count = 0;

    for (filterval; filterval < outputdata.length; filterval) {
      var startsession: any;
      var endSession: any;


      if (this.count < outputdata.length) {

        try {
          startsession = outputdata[filterval][2];
        }
        catch {
          startsession = "";
          filterval++;
        }

        try {
          endSession = outputdata[filterval + 1][2];
        }
        catch {
          endSession = "";
          filterval++;
        }


        if (startsession === this.user_Status_Start && endSession != "") {
          filterval++;

          if (endSession === this.user_Status_End) {
            count_a++;
            filterval++;
          }
          else if (endSession === this.user_Status_Start) {
            count_a++;
            filterval++;
          }

        }
        else if (startsession === this.user_Status_Start && endSession === "") {
          count_a++;
          filterval++;
        }
        else if (startsession === this.user_Status_End) {
          count_a++;
          filterval++;
        }

      }

    }

    if (user === this.user_alice) {
      this.alicelogincount = count_a;
    }
    if (user === this.user_charle) {
      this.charlelogincount = count_a;
    }

    return this.secondsToTime(this.finalSeconds);
  }

  secondsToTime(given_seconds: any) {
    let hours = Math.floor(given_seconds / 3600);
    let minutes = Math.floor((given_seconds - (hours * 3600)) / 60);
    let seconds = given_seconds - (hours * 3600) - (minutes * 60);
    let timeString = hours.toString().padStart(2, '0') + ':' +
      minutes.toString().padStart(2, '0') + ':' +
      seconds.toString().padStart(2, '0');

    return timeString;
  }

}
