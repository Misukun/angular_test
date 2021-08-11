import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

// PrimeNG
import { Table } from 'primeng/table';

// Model
import { Employeer } from '../../models/employeer';
import { WorkPosition } from '../../models/work-position';

// services
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { EmployeerService } from '../../services/employeer.service';
import { WorkPositionService } from '../../services/work-position.service';

@Component({
  selector: 'app-employeers-list',
  templateUrl: './employeers-list.component.html',
  styleUrls: ['./employeers-list.component.scss']
})
export class EmployeersListComponent implements OnInit {

  employeerDialog: boolean = false;

  employeersList: Employeer[] = [];

  employeer: Employeer = new Employeer;

  workPosition: WorkPosition = new WorkPosition;

  submitted: boolean = false;

  changeDetected: boolean = false;
  
  @ViewChild('dt') dt: Table | undefined;

  constructor(public employeerService: EmployeerService, 
              public messageService: MessageService, 
              public confirmationService: ConfirmationService,
              public workPositionService: WorkPositionService) { }

  ngOnInit(): void {
    this.workPositionService.getWorkPosition()
      .subscribe((data: WorkPosition) => {
        this.workPosition = data;
      });

    this.employeerService.getEmployeers()
      .snapshotChanges()
      .subscribe(data => {
        data.forEach(elem => {
          let x: any = elem.payload.toJSON();
          x.$key = elem.key;
          x.dateBirth = new Date(x.dateBirth);
          this.employeersList.push(x as Employeer);
        });
      });
  }

  newEmployeer() {
    this.changeDetected = false;
    this.employeer = new Employeer();
    this.submitted = false;
    this.employeerDialog = true;
  }

  editEmployeer(employeer: Employeer) {
    this.changeDetected = false;
    this.employeerService.selectedEmployeer = Object.assign({}, employeer);
    this.employeerDialog = true;
  }

  deleteEmployeer(employeer: Employeer) {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete ' + employeer.name + ' ' + employeer.surname + '?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.employeerService.deleteEmployeer(employeer.$key);
            this.employeersList = [];
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Employeer Deleted', life: 5000});
          }
      });
  }

  hideDialog(employeerForm: NgForm) {

    let myForm = employeerForm;
    myForm.reset();  
    this.employeerDialog = false;
    this.submitted = false;
    this.employeerService.selectedEmployeer = new Employeer();
    
  }

  saveEmployeer(employeerForm: NgForm) {
    
    let date;

    if(employeerForm.value.name && employeerForm.value.surname && employeerForm.value.workPosition && employeerForm.value.dateBirth) {

      date = employeerForm.value.dateBirth.toString();
      employeerForm.value.dateBirth = Date.parse(date);

      if (employeerForm.value.$key != null) {
        this.employeerService.putEmployeer(employeerForm.value);
      } else {
        this.employeerService.createEmployeer(employeerForm.value);
      }
      this.submitted = true;
      this.employeersList = [];

      this.hideDialog(employeerForm);

      this.messageService.add({severity:'success', summary: 'Successful', detail: 'Employeer Updated', life: 3000});
    } else {
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Is mandatory fill all inputs', life: 5000});
    }

    this.changeDetected = false;
  }

  applyFilterGlobal($event: any, stringVal: string) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

}
