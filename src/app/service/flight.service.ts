import * as myGlobals from '../global';
import {Injectable, Directive} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FlightService {

    constructor(private http: HttpClient) {
    }

    autoFlightSuggestions(value) {
        const token = localStorage.getItem('token');
        const url = myGlobals.ExternalURL + 'flight/get_flight_suggestions/?' + 'token=' + token + '&term=' + value;
        return this.http.get<any>(url)
            .pipe(map((response: Response) => {
                return response;
            }), catchError((error: Response) => {
                return throwError(error.status);
            }));
    }
}
