import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {User} from "../models/user.model";
import {Job} from "../../main/models/jobs.model";

@Component({
  selector: 'app-logins',
  templateUrl: './logins.component.html',
  styleUrls: ['./logins.component.scss']
})
export class LoginsComponent implements OnInit {

  users!: User[];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.getContent()
  }

  private getContent(): void {
    this.authService.getUsers().pipe().subscribe({
      next: (response:User[]) =>{
        this.users = response
      }
    })

  }
}
