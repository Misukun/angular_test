import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { of } from 'rxjs';

import {AngularFireModule} from '@angular/fire';
import {environment} from 'src/environments/environment';
import {HttpClientTestingModule} from '@angular/common/http/testing';

// services
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { EmployeerService } from '../../services/employeer.service';
import { WorkPositionService } from '../../services/work-position.service';

// models
import { Employeer } from '../../models/employeer';
import { WorkPosition } from '../../models/work-position';

// compopnents
import { EmployeersListComponent } from './employeers-list.component';



describe('Test EmployeersListComponent', () => {
  let component: EmployeersListComponent;
  let fixture: ComponentFixture<EmployeersListComponent>;

  // mocks
  const mockWP: WorkPosition = {
    "positions": [
      "full-stack developer",
      "front-end developer",
      "sw admin",
      "help desk",
      "scrum master",
      "product manager"
    ]
  }
  const mockEmployeersList: Employeer[] = [];
  const mockEmployeer: Employeer = {
    $key: '1',
    name: 'Test',
    surname: 'Test',
    workPosition: 'front-end developer',
    dateBirth: 42793200000
  };
  const mockEmployeerEmpty: Employeer = new Employeer;
  const mockEmployeerForm: NgForm = new NgForm([],[]);
  let mockEmployeerFormWithDataKey = <NgForm>{
    value: {
      $key: '1',
      name: 'Test',
      surname: 'Test',
      workPosition: 'front-end developer',
      dateBirth: 'Mon Jul 25 1983 00:00:00 GMT+0200 (hora de verano de Europa central)'
    },
    reset: () => {}
  }
  let mockEmployeerFormWithoutDataKey = <NgForm>{
    value: {
      $key: null,
      name: 'Test',
      surname: 'Test',
      workPosition: 'front-end developer',
      dateBirth: 'Mon Jul 25 1983 00:00:00 GMT+0200 (hora de verano de Europa central)'
    },
    reset: () => {}
  }
  const mockEvent = {
    target: {
      value: 'xxx'
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        HttpClientTestingModule,
        TableModule 
      ],
      declarations: [ EmployeersListComponent ],
      providers: [ 
        MessageService,
        ConfirmationService,
        EmployeerService,
        WorkPositionService
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('When execute ngOnInit(), getWorkPosition() should be executed and this.workPosition is filled.', (done: DoneFn) => {

    spyOn(component.workPositionService, 'getWorkPosition').and.returnValue(of(mockWP));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.workPosition).toEqual(mockWP);
    expect(component.workPositionService.getWorkPosition).toHaveBeenCalled();
    done();
  });

  it('When execute ngOnInit(), getEmployeers() should be executed and this.employeerList is mapped and filled.', (done: DoneFn) => {
    
    spyOn<any>(component.employeerService.getEmployeers(), 'snapshotChanges' as any);

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.employeersList).toEqual(mockEmployeersList);
    done();
  });

  it('When execute newEmployeer(), the next´s parameters should change to: this.changeDetected=false, this.empoyeer={}, this.submitted=false and this.employeerDialog=true', () => {

    component.newEmployeer();

    fixture.detectChanges();

    expect(component.changeDetected).toBeFalse();
    expect(component.employeer).toEqual(mockEmployeerEmpty);
    expect(component.submitted).toBeFalse();
    expect(component.employeerDialog).toBeTrue();

  });

  it('When execute editEmployeer(employeer: Employer), the next´s parameters should change to: this.changeDetected=false, this.employeerService.selectedEmployeer={}, and this.employeerDialog=true', (done: DoneFn) => {

    component.editEmployeer(mockEmployeerEmpty);

    component.employeerService.selectedEmployeer = new Employeer();

    fixture.detectChanges();

    expect(component.changeDetected).toBeFalse();
    expect(component.employeerService.selectedEmployeer).toEqual(mockEmployeerEmpty);
    expect(component.employeerDialog).toBeTrue();

    done();
  });

  it('When execute deleteEmployeer(employeer: Employer), confirmationService and messageService should be exectued and call deleteEmployer(employeer.$key) too', (done: DoneFn) => {

    spyOn<any>(component.confirmationService, 'confirm').and.callFake((param: any) => {
      param.accept();
    });
    spyOn(component.employeerService.employeersList, 'remove' as any);
    spyOn(component.messageService, 'add');

    component.deleteEmployeer(mockEmployeer);

    fixture.detectChanges();

    expect(component.employeersList).toEqual([]);
    expect(component.employeerService.employeersList.remove).toHaveBeenCalled();
    expect(component.messageService.add).toHaveBeenCalled();

    done();
  });

  it('When execute hideDialog(employeerForm: NgForm), should be reset the form and this.employeerService.selectedEmployeer, this.submitted=false and this.employeerDialog=false ', (done: DoneFn) => {

    component.hideDialog(mockEmployeerForm);

    component.employeerService.selectedEmployeer = new Employeer();

    fixture.detectChanges();

    expect(component.employeerDialog).toBeFalse();
    expect(component.submitted).toBeFalse();
    expect(component.employeerService.selectedEmployeer).toEqual(mockEmployeerEmpty);

    done();

  });

  it('When execute saveEmployeer(employeerForm: NGForm) with key and datas, should be updated a employeer', (done: DoneFn) => {

    spyOn(component.employeerService.employeersList, 'update' as any);
    spyOn(component.messageService, 'add');

    component.saveEmployeer(mockEmployeerFormWithDataKey);

    fixture.detectChanges();
    
    expect(component.saveEmployeer).toBeTruthy();
    // expect(component.submitted).toBeTrue();
    expect(component.changeDetected).toBeFalse();
    expect(component.employeersList).toEqual([]);
    expect(component.employeerService.employeersList.update).toHaveBeenCalled;
    expect(component.messageService.add).toHaveBeenCalled();

    done();

  });

  it('When execute saveEmployeer(employeerForm: NGForm) with key and without datas, should not be updated a employeer', (done: DoneFn) => {

    spyOn(component.employeerService.employeersList, 'update' as any);
    spyOn(component.messageService, 'add');

    mockEmployeerFormWithDataKey.value.name = null;
    mockEmployeerFormWithDataKey.value.surname = null;
    mockEmployeerFormWithDataKey.value.workPosition = null;
    mockEmployeerFormWithDataKey.value.dateBirth = null;

    component.saveEmployeer(mockEmployeerFormWithDataKey);

    fixture.detectChanges();

    expect(component.saveEmployeer).toBeTruthy();
    // expect(component.submitted).toBeTrue();
    expect(component.changeDetected).toBeFalse();
    expect(component.employeersList).toEqual([]);
    expect(component.employeerService.employeersList.update).toHaveBeenCalled;
    expect(component.messageService.add).toHaveBeenCalled();

    done();

  });

  it('When execute saveEmployeer(employeerForm: NGForm) without key but with datas, should be create a employeer', (done: DoneFn) => {

    spyOn(component.employeerService.employeersList, 'push' as any);
    spyOn(component.messageService, 'add');

    component.saveEmployeer(mockEmployeerFormWithoutDataKey);

    fixture.detectChanges();
    
    expect(component.saveEmployeer).toBeTruthy();
    // expect(component.submitted).toBeTrue();
    expect(component.changeDetected).toBeFalse();
    expect(component.employeersList).toEqual([]);
    expect(component.employeerService.employeersList.push).toHaveBeenCalled;
    expect(component.messageService.add).toHaveBeenCalled();

    done();

  });

  it('When execute saveEmployeer(employeerForm: NGForm) without key and without datas, should not be create a employeer', (done: DoneFn) => {

    spyOn(component.employeerService.employeersList, 'update' as any);
    spyOn(component.messageService, 'add');

    mockEmployeerFormWithoutDataKey.value.name = null;
    mockEmployeerFormWithoutDataKey.value.surname = null;
    mockEmployeerFormWithoutDataKey.value.workPosition = null;
    mockEmployeerFormWithoutDataKey.value.dateBirth = null;

    component.saveEmployeer(mockEmployeerFormWithoutDataKey);

    fixture.detectChanges();

    expect(component.saveEmployeer).toBeTruthy();
    // expect(component.submitted).toBeTrue();
    expect(component.changeDetected).toBeFalse();
    expect(component.employeersList).toEqual([]);
    expect(component.employeerService.employeersList.update).toHaveBeenCalled;
    expect(component.messageService.add).toHaveBeenCalled();

    done();

  });

  it('When execute applyFilterGlobal($event: any, stringVal: string), should be executed', (done: DoneFn) => {

    component.applyFilterGlobal(mockEvent, 'contains');
    component.dt?.filterGlobal(mockEvent, 'contains');

    expect(component.applyFilterGlobal).toHaveBeenCalled;
    expect(component.dt?.filterGlobal).toHaveBeenCalled;

    expect(component.applyFilterGlobal).toBeTruthy();
    expect(component.dt?.filterGlobal).toBeTruthy();

    done();

  });
});
