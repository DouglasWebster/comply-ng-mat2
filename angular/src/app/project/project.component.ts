import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AuthManagerService, UtilityService } from '../services/index';
import { IProject, ITask, IUser } from '../interfaces/index';
import { NewProjectComponent } from './new-project/new-project.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  projects: Array<Object>;
  otherProjects: Array<IProject>;
  assignedTasks: Array<ITask>;

  constructor(
    private authManager: AuthManagerService,
    private utility: UtilityService,
    private projectDlg: MatDialog) {

  }

  getProjects(): any {
    this.utility.makeGetRequest('/api/project/getAll', [this.authManager.getAuthToken()]).then((result: Array<IProject>) => {
      this.projects = [];
      for (let i = 0; i < result.length; i++) {
        console.log(`project ${i + 1} is `, result[i]);
        this.projects.push(result[i]);
      }
    }, error => {
      console.error(error);
    });
  }

  getOtherProjects(): any {
    this.otherProjects = [];
    this.utility.makeGetRequest('/api/project/getOther', [this.authManager.getAuthToken()]).then((result: Array<IProject>) => {
      this.otherProjects = [];
      for (let i = 0; i < result.length; i++) {
        if (result[i].owner._id !== this.authManager.getAuthToken()) {
          this.otherProjects.push(result[i]);
        }
      }
    }, (error) => {
      console.error(error);
    });
  }

  getAssignedTasks(): any {
    this.utility.makeGetRequest('/api/task/getAssignedTo', [this.authManager.getAuthToken()]).then((result: Array<ITask>) => {
      this.assignedTasks = [];
      for (let i = 0; i < result.length; i++) {
        if (result[i].owner._id !== this.authManager.getAuthToken()) {
          this.assignedTasks.push(result[i]);
        }
      }
    }, (error) => {
      console.error(error);
    });
  }

  ngOnInit() {
    this.getProjects();
    this.getOtherProjects();
    this.getAssignedTasks();
  }

  public doNewProject() {
    const registerDlgRef = this.projectDlg.open(NewProjectComponent, { width: '450px' });
    registerDlgRef.afterClosed().subscribe(result => {
      console.log('New Project Dialog returned', result);
      if (result === '') {
        console.log('New Project not registerd');
      } else {
        this.getProjects();
      }
    });
  }

}
