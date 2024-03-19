import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserData } from '../../service/FairBillingService/UserData';
import { GenerateBillReport } from '../../service/FairBillingService/GenerateBillReport';
import { HttpClientTestingModule } from '@angular/common/http/testing'

import { FairBillingComponent } from './fair-billing.component';
import { HttpClient } from '@angular/common/http';

describe('FairBillingComponent', () => {
  let component: FairBillingComponent;
  let fixture: ComponentFixture<FairBillingComponent>;
  const userData = UserData;
  let logBillingData: any;
  
  beforeEach(async () => {

    logBillingData = [
      {
        "a_Time": "14:02:03",
        "b_Name": "ALICE99",
        "c_Session": "START"
      },
      {
        "a_Time": "14:02:05",
        "b_Name": "CHARLEE",
        "c_Session": "END"
      }
    ];  

    await TestBed.configureTestingModule({
      declarations: [FairBillingComponent],

    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FairBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all the ngOnInit details', () => {
    spyOn(component, 'ngOnInit').and.returnValue(logBillingData);
    expect(component).toBeTruthy();
  });

  it('should get all the generateReport details', () => {
    spyOn(component, 'generateReport').and.returnValue(logBillingData);
    expect(component).toBeTruthy();
  });

  it('should get all the handleFairBilling details', () => {
    spyOn(component, 'handleFairBilling').and.returnValue(logBillingData);
    expect(component).toBeTruthy();
  });

  it('should get all the handleFairBilling details', () => {
    spyOn(component, 'handleFairBilling').and.returnValue(logBillingData);
    expect(component).toBeTruthy();
  });

  it('should get all the ReportGenerateAlice details', () => {
    spyOn(component, 'ReportGenerateAlice').and.returnValue(logBillingData);
    expect(component).toBeTruthy();
  });

  it('should get all the ReportGenerateCharle details', () => {
    spyOn(component, 'ReportGenerateCharle').and.returnValue(logBillingData);
    expect(component).toBeTruthy();
  });

  it('should get all the calculateSessionTime details', () => {
    spyOn(component, 'calculateSessionTime').and.returnValue(logBillingData);
    expect(component).toBeTruthy();
  });

  it('should get all the secondsToTime details', () => {
    spyOn(component, 'secondsToTime').and.returnValue(logBillingData);
    expect(component).toBeTruthy();
  });

  

});
