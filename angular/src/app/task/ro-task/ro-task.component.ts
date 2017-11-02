import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { UtilityService } from '../../services/index';
import { IProject, ITask, IUser } from '../../interfaces/index';

@Component({
  selector: 'app-ro-task',
  templateUrl: './ro-task.component.html',
  styleUrls: ['./ro-task.component.scss']
})
export class RoTaskComponent implements OnInit {

  project: IProject;
  task: ITask;
  comment: String;
  projectId: string;
  taskId: string;
  taskUser: string;
  users: Array<IUser>;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private utility: UtilityService,
  ) {
    this.project = { _id: '', name: '', description: '', owner: <IUser>{}, users: [], tasks: [], permalink: '' };
    this.task = { _id: '', name: '', description: '', owner: null, assignedTo: <IUser>{}, users: [], history: [], permalink: '' };
  }

  ngOnInit() {
    this.taskId = this.route.snapshot.paramMap.get('url');
    this.getTask(this.taskId);

  }

  getTask(taskId) {
    this.utility.makeGetRequest('/api/task/link', [taskId]).then((result: any) => {
      console.log('taskId:', [taskId]);
      this.task = <ITask>result.task;
      this.getProject(result.projectId);
    }, (error) => {
      console.error(error);
    });
  }

  getProject(projectId: string) {
    this.utility.makeGetRequest('/api/project/get', [projectId]).then((result) => {
      this.project = <IProject>result;
    }, (error) => {
      console.log(error);
    });
  }
  parseDate(date: string) {
    const d: Date = new Date(date);
    const fullMonth = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    return fullMonth[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear() + ' @ ' + d.toLocaleTimeString();
  }
}
