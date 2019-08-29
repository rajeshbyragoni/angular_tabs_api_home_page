import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import * as myGlobals from '../global';
import {catchError, map, tap} from 'rxjs/operators';
import {throwError, Observable, of} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NewsletterService {

    constructor(private http: HttpClient) {
    }

    getNewsLater(): Observable<any> {
        const url = myGlobals.ExternalUrl + 'dashboard/newsletter';
        const token = localStorage.getItem('token');
        const params = new HttpParams().set('token', token);
        return this.http.get<any>(url, {params})
            .pipe(map((response: Response) => {
                return response;
            }), catchError((error: Response) => {
                return throwError(error.status);
            }));
    }


    updateNewsLatter(status): Observable<any> {

        const url = myGlobals.ExternalUrl + 'dashboard/subscribe_or_Unsubscribe';

        const formData = new FormData();
        formData.append('email', localStorage.getItem('email'));
        formData.append('token', localStorage.getItem('token'));
        formData.append('status', status);

        return this.http.post<any>(url, formData)
            .pipe(map((response: Response) => {
                return response;
            }), catchError((error: Response) => {
                return throwError(error.status);
            }));
    }
}
