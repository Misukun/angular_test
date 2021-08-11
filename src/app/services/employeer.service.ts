import { Injectable } from '@angular/core';

// Database
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

// Models
import { Employeer } from '../models/employeer';

@Injectable({
  providedIn: 'root'
})
export class EmployeerService {

  employeersList!: AngularFireList<any>;
  selectedEmployeer: Employeer = new Employeer();

  constructor(public firebase: AngularFireDatabase) { }

  // GET method
  getEmployeers() {
    return this.employeersList = this.firebase.list('employeers');
  }

  // CREATE method
  createEmployeer(employeer: Employeer) {
    this.employeersList.push({
      name: employeer.name,
      surname: employeer.surname,
      workPosition: employeer.workPosition,
      dateBirth: employeer.dateBirth
    });
  }

  // PUT method
  putEmployeer(employeer: Employeer) {
    this.employeersList.update(employeer.$key, {
        name: employeer.name,
        surname: employeer.surname,
        workPosition: employeer.workPosition,
        dateBirth: employeer.dateBirth
    });
  }

  // DELETE method
  deleteEmployeer($key: string) {
    this.employeersList.remove($key);
  }

}
