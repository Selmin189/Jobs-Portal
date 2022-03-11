import { Component, OnInit } from '@angular/core';
import {Job} from "../../models/jobs.model";
import {JobsService} from "../../services/jobs.service";
@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

  jobs!: Job[];
  appliedJob!: Job;
  constructor(private jobsService: JobsService,
              ) { }

  ngOnInit(): void {
    this.getContent()
  }
  onMarkAsApplied(job: Job): void{
    this.appliedJob = job;
  }
  onListUpdate(): void {
    this.getContent()
  }
  onJobDelete(jobId: number): void {
    this.jobsService.deleteJob$(jobId).subscribe({
      next: () => {
        this.jobs = this.jobs.filter(job => job.id !== jobId)
      }
    })

  }
  private getContent(): void {
    this.jobsService.getJobs$().pipe().subscribe({
      next: (response:Job[]) =>{
        this.jobs = response
      }
    })

  }
}
