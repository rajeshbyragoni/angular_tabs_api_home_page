import * as myGlobals from '../global';
import { Injectable, Directive } from '@angular/core';
import {HttpClient, HttpHeaders,  HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PackageService {

    constructor(private http: HttpClient) {}

     getPackLocatAPI(keyValue): Observable<any> {
         const token = localStorage.getItem('token');
        const url = myGlobals.ExternalURL + 'packages/get_packages_city_suggestions/?' + 'token=' + token;
        const params = new HttpParams().set('term', keyValue);
        return this.http.get<any>(url, {params})
            .pipe(map((response: Response) => {
                return response;
            }), catchError((error: Response) => {
                return throwError(error.status);
            }));
    }

    packageTypeDataAPI(): Observable<any> {
        const token = localStorage.getItem('token');
        const url = myGlobals.ExternalURL + 'packages/package_types_data/?' + 'token=' + token;
        return this.http.get<any>(url)
            .pipe(map((response: Response) => {
                return response;
            }), catchError((error: Response) => {
                return throwError(error.status);
            }));
    }

    searchQueryAPI(trip_date, holiday_type, city): Observable<any> {
        const token = localStorage.getItem('token');
        const url = myGlobals.ExternalURL + 'packages/search?' + '&token=' + token;
        const params = new HttpParams().set('trip_date', trip_date).set('holiday_type', holiday_type).set('city', city);
        return this.http.get<any>(url, {params})
            .pipe(map((response: Response) => {
                return response;
            }), catchError((error: Response) => {
                return throwError(error.status);
            }));
    }

    getSearchData(query): Observable<any> {
        const token = localStorage.getItem('token');
        const url = myGlobals.ExternalURL + 'packages/?' + query + '&token=' + token;
        return this.http.get<any>(url)
            .pipe(map((response: Response) => {
                return response;
            }), catchError((error: Response) => {
                return throwError(error.status);
            }));
    }

    getSearchApiData(request, sessiondata, apiID): Observable<any> {
        const token = localStorage.getItem('token');
        const url = myGlobals.ExternalURL + 'packages/call_api/' + apiID + '?token=' + token;
        const params = new HttpParams().set('request', request).set('sessiondata', sessiondata);
        return this.http.get<any>(url, {params})
            .pipe(map((response: Response) => {
                return response;
            }), catchError((error: Response) => {
                return throwError(error.status);
            }));
    }

    packageAPIdetails(packageID, resultID, request, apiID, sessionID): Observable<any> {
        const token = localStorage.getItem('token');
        const url = myGlobals.ExternalURL + 'packages/package_details' + '?token=' + token;
        const params = new HttpParams().set('package_id', packageID).set('id', resultID).set('request', request)
        .set('api_id', apiID).set('session_id', sessionID);
        return this.http.get<any>(url, {params})
            .pipe(map((response: Response) => {
                return response;
            }), catchError((error: Response) => {
                return throwError(error.status);
            }));
    }

    getRoomDetails(city, adult_count, child_count, infant_count, hotel_checkin, hotel_code, nationality): Observable<any> {
        const token = localStorage.getItem('token');
        const url = myGlobals.ExternalURL + 'packages/get_room_details/?' +'token=' + token;
        const params = new HttpParams().set('city', city).set('adult_count', adult_count).set('child_count', child_count)
            .set('infant_count', infant_count).set('hotel_checkin', hotel_checkin).set('hotel_code', hotel_code).set('nationality', nationality);
        return this.http.get<any>(url, {params})
            .pipe(map((response: Response) => {
                return response;
            }), catchError((error: Response) => {
                return throwError(error.status);
            }));
    }

    calculateTotal(city, adult_count, child_count, infant_count, hotel_checkin, hotel_code, nationality): Observable<any> {
        const token = localStorage.getItem('token');
        const url = myGlobals.ExternalURL + 'packages/packages/calculate_total/?' +'token=' + token;
        const params = new HttpParams().set('city', city).set('adult_count', adult_count).set('child_count', child_count)
            .set('infant_count', infant_count).set('hotel_checkin', hotel_checkin).set('hotel_code', hotel_code).set('nationality', nationality);
        return this.http.get<any>(url, {params})
            .pipe(map((response: Response) => {
                return response;
            }), catchError((error: Response) => {
                return throwError(error.status);
            }));
    }
}
