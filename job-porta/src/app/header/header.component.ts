import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/services/auth.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  currentUser: any;

  constructor(
    private router: Router,
    public authenticationService: AuthService
  ) {

  }
  // @ts-ignore
  isLoggedIn$ : Observable<boolean>;
  ngOnInit() {
    this.isLoggedIn$ = this.authenticationService.isUserLoggedIn;
  }

  onLogOut(): void {
   this.authenticationService.logout();

   this.router.navigate(['/auth','login'])
 }

}
