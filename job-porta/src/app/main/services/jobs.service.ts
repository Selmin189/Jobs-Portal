import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Job} from "../models/jobs.model";

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  private url =  `${environment.apiUrl}/jobs`;

  constructor(private http: HttpClient) {
  }
  getJobs$(): Observable<Job[]> {
    return this.http.get<Job[]>(this.url);
  }
  postJob$(job: Job): Observable<Job>{
    return  this.http.post<Job>(this.url, job)
  }
  deleteJob$(id: number): Observable<void>{
    const url = `${this.url}/${id}`

    return this.http.delete<void>(url)
  }
  getJob$(id: number): Observable<Job> {
    const url = `${this.url}/${id}`

    return this.http.get<Job>(url);
  }
  putJob$(job: Job): Observable<Job> {
    const url = `${this.url}/${job.id}`

    return this.http.put<Job>(url, job);
  }
}
