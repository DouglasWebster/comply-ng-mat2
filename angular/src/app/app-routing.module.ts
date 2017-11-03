import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthComponent } from './auth/auth.component';
import { ProjectComponent } from './project/project.component';
import { TaskComponent } from './task/task.component';
import { TasksComponent } from './tasks/tasks.component';
import { CompaniesComponent } from './companies/companies.component';
import { RoTasksComponent } from './tasks/ro-tasks/ro-tasks.component';
import { RoTaskComponent } from './task/ro-task/ro-task.component';
import { ProjectGuard } from './project/project.guard';
import { CompaniesGuard } from './companies/companies.guard';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'projects', component: ProjectComponent, canActivate: [ProjectGuard] },
  { path: 'companies', component: CompaniesComponent, canActivate: [CompaniesGuard] },
  { path: '', redirectTo: '/projects', pathMatch: 'full' },
  { path: 'task/:taskId', component: TaskComponent },
  { path: 'tasks/:projectId', component: TasksComponent },
  { path: 'p/:url', component: RoTasksComponent },
  { path: 't/:url', component: RoTaskComponent }
];

@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class AppRoutingModule { }
