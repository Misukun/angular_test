import { TestBed } from '@angular/core/testing';

import { EmployeerService } from './employeer.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabase } from '@angular/fire/database';
import { environment } from 'src/environments/environment';

import { Employeer } from '../models/employeer';

describe('Test EmployeerService', () => {
  let service: EmployeerService;
  

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebase)],
      providers: [
        AngularFireDatabase
      ],
    }).compileComponents();
    service = TestBed.inject(EmployeerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('When CREATE method is called, recive a Employeer object, push should be called and push results in array list', (done: DoneFn) => {
    service.getEmployeers();

    spyOn(service.employeersList, 'push' as any);

    const mockEmployeer: Employeer = {
      $key: '1',
      name: 'Test',
      surname: 'Test',
      workPosition: 'front-end developer',
      dateBirth: 100000000
    };

    service.createEmployeer(mockEmployeer);
    expect(service.employeersList.push).toHaveBeenCalled();

    done();
  });

  it('When PUT method is called, recive a Employeer object and update should be called', (done: DoneFn) => {
    service.getEmployeers();

    spyOn(service.employeersList, 'update' as any);

    const mockEmployeer: Employeer = {
      $key: '1',
      name: 'Test',
      surname: 'Test',
      workPosition: 'front-end developer',
      dateBirth: 100000000
    };

    service.putEmployeer(mockEmployeer);
    expect(service.employeersList.update).toHaveBeenCalled();

    done();
  });

  it('When DELETE method is called, recive a $key string and remove should be called', (done: DoneFn) => {
    service.getEmployeers();

    spyOn(service.employeersList, 'remove' as any);

    const mockKey = '1';

    service.deleteEmployeer(mockKey);
    expect(service.employeersList.remove).toHaveBeenCalled();

    done();
  });
});
