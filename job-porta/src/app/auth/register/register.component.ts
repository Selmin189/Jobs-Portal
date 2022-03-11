import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators,} from '@angular/forms';
import {map, takeUntil} from 'rxjs/operators';
import {of, Subject, switchMap} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from "../services/auth.service";
import {User} from "../models/user.model";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;
  errorMessage!: string;

  destroy$ = new Subject<boolean>();

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService) {

  }

  ngOnInit(): void {
    this.buildForm();
  }

  onSubmit(): void {
    const formData = this.form.value;

    this.authService.getUsers().pipe(
      map((response: User[]) => response.find(user => user.username === formData.username)),
      takeUntil(this.destroy$)
    ).subscribe(userResponse => {
      if (userResponse) {
        this.errorMessage = 'Username has already been taken. Try with another one.';

        return;
      }

      this.authService.register(this.form.value).pipe(
        takeUntil(this.destroy$)
      ).subscribe(response => {
        this.router.navigate(['auth/login']);
      });
    });
  }

  private buildForm(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    });
  }
}

