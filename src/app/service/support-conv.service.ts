import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import * as myGlobals from '../global';
import {catchError, map, tap} from 'rxjs/operators';
import {throwError, Observable, of} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SupportConvService {

    constructor(private http: HttpClient) {
    }


    getSupConv(): Observable<any> {
        const url = myGlobals.ExternalUrl + 'dashboard/support_conversation';
        const token = localStorage.getItem('token');
        const params = new HttpParams().set('token', token);
        return this.http.get<any>(url, {params})
            .pipe(map((response: Response) => {
                return response;
            }), catchError((error: Response) => {
                return throwError(error.status);
            }));
    }

    newTicket(subject, file_name, message): Observable<any> {
        const url = myGlobals.ExternalUrl + 'dashboard/add_new_ticket';
        const formData = new FormData();
        formData.append('token', localStorage.getItem('token'));
        formData.append('subject', subject);
        formData.append('file_name', file_name);
        formData.append('message', message);

        return this.http.post<any>(url, formData)
            .pipe(map((response: Response) => {
                return response;
            }), catchError((error: Response) => {
                return throwError(error.status);
            }));
    }
}
