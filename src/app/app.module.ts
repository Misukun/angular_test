// Core
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Main Component
import { AppComponent } from './app.component';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

// Prime NG
import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {CalendarModule} from 'primeng/calendar';
import {ToolbarModule} from 'primeng/toolbar';
import {ToastModule} from 'primeng/toast';
import {ConfirmationService} from 'primeng/api';
import {MessageService} from 'primeng/api';

// Animations
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// Componnents
import { EmployeersListComponent } from './components/employeers-list/employeers-list.component';
import { EmployeerComponent } from './components/employeer/employeer.component';

// Services
import { EmployeerService } from './services/employeer.service';
import { WorkPositionService } from './services/work-position.service';

@NgModule({
  declarations: [
    AppComponent,
    EmployeersListComponent,
    EmployeerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    HttpClientModule,
    DropdownModule,
    ButtonModule,
    TableModule,
    ConfirmDialogModule,
    DialogModule,
    InputTextModule,
    ToolbarModule,
    ToastModule,
    CalendarModule
  ],
  providers: [
    ConfirmationService,
    EmployeerService,
    WorkPositionService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
