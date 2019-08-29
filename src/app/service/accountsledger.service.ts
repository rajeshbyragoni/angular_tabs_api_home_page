import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import * as myGlobals from '../global';
import {catchError, map, tap} from 'rxjs/operators';
import {throwError, Observable, of} from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class AccountsledgerService {

    constructor(private http: HttpClient) {
    }

    getStatementList(): Observable<any> {
        const url = myGlobals.ExternalUrl + 'dashboard/account_statement';
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

