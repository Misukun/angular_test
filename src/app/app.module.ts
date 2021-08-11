// Core
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Main Component
import { AppComponent } from './app.component';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

// Prime NG Modules
import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {CalendarModule} from 'primeng/calendar';
import {ToolbarModule} from 'primeng/toolbar';
import {ToastModule} from 'primeng/toast';
import {MessageModule} from 'primeng/message';

// Prime NG services
import {ConfirmationService} from 'primeng/api';
import {MessageService} from 'primeng/api';

// Prime NG components
// import { Dialog } from 'primeng/dialog';
// import { ConfirmDialog } from 'primeng/confirmdialog';
// import { Toolbar } from 'primeng/toolbar';
// import { Table } from 'primeng/table';

// Animations
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// Componnents
import { EmployeersListComponent } from './components/employeers-list/employeers-list.component';

// Services
import { EmployeerService } from './services/employeer.service';
import { WorkPositionService } from './services/work-position.service';

@NgModule({
  declarations: [
    AppComponent,
    EmployeersListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    DropdownModule,
    ButtonModule,
    TableModule,
    ConfirmDialogModule,
    DialogModule,
    InputTextModule,
    ToolbarModule,
    ToastModule,
    MessageModule,
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
