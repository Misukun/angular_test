import { Component, OnInit } from '@angular/core';

// animation buttons
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(public primengConfig: PrimeNGConfig) {}

  ngOnInit() {
    this.primengConfig.ripple = true;   
  }

}
