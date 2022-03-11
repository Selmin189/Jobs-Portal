import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../models/login.model';
import {BehaviorSubject, Observable} from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import {Job} from "../../main/models/jobs.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly url = 'http://localhost:3000/users';
  private currentUserSubject : BehaviorSubject<User>;
  private currentUser : Observable<User>;
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) {

    // @ts-ignore
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('loggedUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User{
    return this.currentUserSubject.value;
  }

  login$(data: Login): Observable<User> {
    // @ts-ignore
    return this.http.get<User[]>(`${environment.apiUrl}/users`).pipe(
      map((response: User[]) => {
        const user = response.find(u => u.username === data.username && u.password === data.password);

        if (user) {
          return user;
        }

        return null;
      })
    );
  }
  get isUserLoggedIn(){
    return this.loggedIn.asObservable();
  }


  logout(): void {
    localStorage.removeItem('loggedUser');
  }
  register(user: User): Observable<User> {
    return this.http.post<User>(this.url, user);
  }


  storeUserData(user: User): void {
    // @ts-ignore
    delete user.password;
    localStorage.setItem('loggedUser', JSON.stringify(user));
  }


  getUserFromStorage(): User {
    // @ts-ignore
    return JSON.parse(localStorage.getItem('loggedUser'));
  }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }
  putUser(user: User): Observable<User> {
    const url = `${this.url}/${user.id}`

    return this.http.put<User>(url, user);
  }
  getUser(id: number): Observable<User> {
    const url = `${this.url}/${id}`

    return this.http.get<User>(url);
  }
  postUser(user: User): Observable<User>{
    return  this.http.post<User>(this.url, user)
  }

}
