import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { UtilityService } from '../../services/index';
import { IProject, IUser } from '../../interfaces/index';

@Component({
  selector: 'app-ro-tasks',
  templateUrl: './ro-tasks.component.html',
  styleUrls: ['./ro-tasks.component.scss']
})
export class RoTasksComponent implements OnInit {

  project: IProject;
  projectId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private utility: UtilityService) {
    this.project = { _id: '', name: '', description: '', owner: <IUser>{}, users: [], tasks: null, permalink: '' };
  }

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('url');
    this.getProject(this.projectId);
  }

  getProject(projectId: string) {
    this.utility.makeGetRequest('/api/project/link', [projectId]).then((result) => {
      this.project = <IProject>result;
    }, (error) => {
      console.log(error);
    });
  }
}
