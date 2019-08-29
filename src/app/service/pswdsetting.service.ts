import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import * as myGlobals from '../global';
import {catchError, map, tap} from 'rxjs/operators';
import {throwError, Observable, of} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PswdsettingService {

    constructor(private http: HttpClient) {
    }


    updatePswd(cpwd, npwd, rpwd): Observable<any> {

        const url = myGlobals.ExternalUrl + 'dashboard/changepwd';

        const formData = new FormData();
        formData.append('token', localStorage.getItem('token'));
        formData.append('cpwd', cpwd);
        formData.append('npwd', npwd);
        formData.append('rpwd', rpwd);

        return this.http.post<any>(url, formData)
            .pipe(map((response: Response) => {
                return response;
            }), catchError((error: Response) => {
                return throwError(error.status);
            }));
    }


}
