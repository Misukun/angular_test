import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

// Models
import { WorkPosition } from '../models/work-position';

@Injectable({
  providedIn: 'root'
})
export class WorkPositionService {

  workPositionList!: WorkPosition;

  constructor(private http: HttpClient) { }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
			'Content-Type': 'application/json;charset=utf-8'
    })
  }

  // Path API Work Position
  path = 'https://ibillboard.com/api/positions';

  // GET method
  getWorkPosition() {
    return this.http.get<WorkPosition>(this.path);
  }
}
