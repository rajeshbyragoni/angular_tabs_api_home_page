import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import * as myGlobals from '../global';
import {catchError, map, tap} from 'rxjs/operators';
import {throwError, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinanReportService {

  constructor(private http: HttpClient) {}

  getFinaState(): Observable<any> {
    const url = myGlobals.ExternalUrl + 'dashboard/financial_report';
    const token = localStorage.getItem('token');
    const params = new HttpParams().set('token', token);
    return this.http.get<any>(url, {params})
        .pipe(map((response: Response) => {
          return response;
        }), catchError((error: Response) => {
          return throwError(error.status);
        }));
  }
}
