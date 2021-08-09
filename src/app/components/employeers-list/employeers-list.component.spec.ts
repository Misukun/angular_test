import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeersListComponent } from './employeers-list.component';

describe('EmployeersListComponent', () => {
  let component: EmployeersListComponent;
  let fixture: ComponentFixture<EmployeersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeersListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
