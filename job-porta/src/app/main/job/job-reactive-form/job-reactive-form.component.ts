import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Job} from "../../models/jobs.model";
import {ActivatedRoute, Router} from "@angular/router";
import {of, Subject, switchMap, takeUntil} from "rxjs";
import {JobsService} from "../../services/jobs.service";

@Component({
  selector: 'app-job-reactive-form',
  templateUrl: './job-reactive-form.component.html',
  styleUrls: ['./job-reactive-form.component.scss']
})
export class JobReactiveFormComponent implements OnInit,OnDestroy  {

  @Output() listChange = new EventEmitter<void>();

  formGroup!: FormGroup;

  job!: Job;

  destroy$ = new Subject<boolean>();

  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private jobsService: JobsService) {
    this.job = {
      title: '',
      description: '',
      likes: 0,
      type: '',
      category: ''
    }
  }

  get titleFormControl(): FormControl{
    return this.formGroup?.get('title') as FormControl
  }
  get descriptionFormControl(): FormControl{
    return this.formGroup.get('description') as FormControl
  }
  get typeFormControl(): FormControl{
    return this.formGroup.get('type') as FormControl
  }
  get categoryFormControl(): FormControl{
    return this.formGroup.get('category') as FormControl
  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params) => {
        if (params['id']) {
          return this.jobsService.getJob$(params['id']);
        }

        this.initForm();

        return of(null);
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        if (response) {
          this.job = response;

          this.initForm();
        }
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }

  onSubmit(): void{
    if (this.formGroup.invalid){
      this.formGroup.markAllAsTouched();

      return;
    }
    const job: Job = {
      id: this.formGroup.value.id,
      title: this.formGroup.value.title,
      description: this.formGroup.value.description,
      likes: this.formGroup.value.likes,
      type: this.formGroup.value.type,
      category: this.formGroup.value.category
    }
    let request$;
    if(job.id){
      request$ = this.jobsService.putJob$(job)
    }else{
      request$ = this.jobsService.postJob$(job)
    }
    request$.subscribe({
      next: () => {
        this.router.navigate(['/jobs'])
      }
    });
  }

  private initForm(): void {
    this.formGroup = this.fb.group({
      id: this.job.id,
      title: [this.job.title, [Validators.required, Validators.maxLength(100)]],
      description: this.job.description,
      likes: this.job.likes,
      type: this.job.type,
      category: this.job.category
    });
  }
}
