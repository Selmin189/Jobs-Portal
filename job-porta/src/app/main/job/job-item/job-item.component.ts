import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Job} from "../../models/jobs.model";
import {AuthService} from "../../../auth/services/auth.service";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {User} from "../../../auth/models/user.model";
import {Login} from "../../../auth/models/login.model";

@Component({
  selector: 'app-job-item',
  templateUrl: './job-item.component.html',
  styleUrls: ['./job-item.component.scss']
})
export class JobItemComponent{

   clicked$ = false;

  @Input() job!: Job;
  @Input() login!: Login;
  @Output() jobClicked: EventEmitter<Job> = new EventEmitter<Job>();
  @Output() jobDeleted: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private authService: AuthService,
  ) {
  }

  onDelete(): void {

      this.jobDeleted.emit(this.job.id);

  }

  onClick(): void{
    this.jobClicked.emit(this.job);
  }

  onUpdate() {
    this.job.likes++

    this.clicked$ = true;
  }
}
