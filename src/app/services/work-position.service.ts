import { Injectable } from '@angular/core';

// Models
import { WorkPosition } from '../models/work-position';

@Injectable({
  providedIn: 'root'
})
export class WorkPositionService {

  workPositionList!: WorkPosition;

  constructor() { }

  // GET method
  getWorkPosition() {
    
  }
}
