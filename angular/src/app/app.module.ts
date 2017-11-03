import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { ComplyMaterialModule } from './comply-material.module';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { NewUserComponent } from './auth/new-user/new-user.component';

import { AuthManagerService } from './services/auth-manager.service';
import { UtilityService } from './services/utility.service';
import { CompaniesComponent } from './companies/companies.component';
import { CompaniesGuard } from './companies/companies.guard';
import { NewCompanyComponent } from './companies/new-company/new-company.component';
import { ProjectComponent } from './project/project.component';
import { ProjectGuard } from './project/project.guard';
import { NewProjectComponent } from './project/new-project/new-project.component';
import { TasksComponent } from './tasks/tasks.component';
import { NewTaskComponent } from './tasks/new-task/new-task.component';
import { TaskComponent } from './task/task.component';
import { AddPhotoComponent } from './task/add-photo/add-photo.component';
import { RoTasksComponent } from './tasks/ro-tasks/ro-tasks.component';
import { RoTaskComponent } from './task/ro-task/ro-task.component';
import { InputFileComponent } from './helpers/input-file/input-file.component';
import { ByteFormatPipe } from './helpers/byte-format.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    NewUserComponent,
    CompaniesComponent,
    NewCompanyComponent,
    ProjectComponent,
    NewProjectComponent,
    TasksComponent,
    NewTaskComponent,
    TaskComponent,
    AddPhotoComponent,
    RoTasksComponent,
    RoTaskComponent,
    InputFileComponent,
    ByteFormatPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ComplyMaterialModule
  ],
  providers: [
    CompaniesGuard,
    ProjectGuard,
    AuthManagerService,
    UtilityService
  ],
  entryComponents: [
    NewUserComponent,
    NewCompanyComponent,
    NewProjectComponent,
    NewTaskComponent,
    AddPhotoComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  // Diagnostic only: inspect router configuration
  constructor(router: Router) {
    console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }

}
