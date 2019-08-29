import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import * as myGlobals from '../global';
import {catchError, map, tap} from 'rxjs/operators';
import {throwError, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubAgenDepService {

  constructor(private http: HttpClient) {
  }

  getSupDep(): Observable<any> {
    const url = myGlobals.ExternalUrl + 'dashboard/subdeposit';
    const params = new HttpParams().set('token', localStorage.getItem('token'));
    return this.http.get<any>(url, {params})
        .pipe(map((response: Response) => {
          return response;
        }), catchError((error: Response) => {
          return throwError(error.status);
        }));
  }
}
