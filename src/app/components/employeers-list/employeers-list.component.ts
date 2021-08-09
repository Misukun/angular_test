import { Component, OnInit } from '@angular/core';

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

  employeers: Employeer[] = [];

  employeer!: Employeer;

  workPosition!: WorkPosition;

  submitted: boolean = false;

  constructor(private employeerService: EmployeerService, 
              private messageService: MessageService, 
              private confirmationService: ConfirmationService,
              private workPositionService: WorkPositionService) { }

  ngOnInit(): void {
    // this.employeerService.getEmployeers().then(data => this.employeers = data);
  }

  newEmployeer() {
    this.employeer = new Employeer();
    this.submitted = false;
    this.employeerDialog = true;
    console.log('create new');
  }

  editEmployeer(employeer: Employeer) {
      this.employeer = {...employeer};
      this.employeerDialog = true;
  }

  deleteEmployeer(employeer: Employeer) {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete ' + employeer.name + '?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              // this.employeers = this.employeers.filter((val: { id: any; }) => val.id !== employeer.id);
              this.employeer = new Employeer;
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Employeer Deleted', life: 3000});
          }
      });
  }

}
