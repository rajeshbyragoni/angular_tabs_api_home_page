import * as myGlobals from '../global';
import { Injectable, Directive } from '@angular/core';
import {HttpClient, HttpHeaders,  HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TourService {

    constructor(private http: HttpClient) {}

     // Tour Details Starts Here

     geTourLocation(keyValue): Observable<any> {
         const token = localStorage.getItem('token');
        const url = myGlobals.ExternalURL + 'tour/get_tour_city_suggestions/?' + 'token=' + token;
        const params = new HttpParams().set('term', keyValue);
        return this.http.get<any>(url, {params})
            .pipe(map((response: Response) => {
                return response;
            }), catchError((error: Response) => {
                return throwError(error.status);
            }));
    }


    getTourAPIurl(formedURL): Observable<any> {
        const token = localStorage.getItem('token');
        const url = myGlobals.ExternalURL + 'tour/search?' + formedURL + '&token=' + token;
        return this.http.get<any>(url)
            .pipe(map((response: Response) => {
                return response;
            }), catchError((error: Response) => {
                return throwError(error.status);
            }));
    }

    getSearchData(params): Observable<any> {
        const token = localStorage.getItem('token');
        const url = myGlobals.ExternalURL + 'tour/?' + params + '&token=' + token;
        return this.http.get<any>(url)
            .pipe(map((response: Response) => {
                return response;
            }), catchError((error: Response) => {
                return throwError(error.status);
            }));
    }


    getSearchApiData(request, sessiondata, apiID): Observable<any> {
        const token = localStorage.getItem('token');
        const url = myGlobals.ExternalURL + 'tour/call_api/' + parseInt(apiID, 10) + '?token=' + token;
        const params = new HttpParams().set('request', request).set('sessiondata', sessiondata);
        return this.http.get<any>(url, {params})
            .pipe(map((response: Response) => {
                console.log(response);
                return response;
            }), catchError((error: Response) => {
                return throwError(error.status);
            }));
    }

    getRegion(regionID): Observable<any> {
        const token = localStorage.getItem('token');
        const url = myGlobals.ExternalURL + 'tour/get_region/' + parseInt(regionID, 10) + '?token=' + token;
        return this.http.get<any>(url)
            .pipe(map((response: Response) => {
                return response;
            }), catchError((error: Response) => {
                return throwError(error.status);
            }));
    }

    getSubRegion(subRegionID): Observable<any> {
        const token = localStorage.getItem('token');
        const url = myGlobals.ExternalURL + 'tour/get_region_subregion/' + parseInt(subRegionID, 10) + '?token=' + token;
        return this.http.get<any>(url)
            .pipe(map((response: Response) => {
                return response;
            }), catchError((error: Response) => {
                return throwError(error.status);
            }));
    }

    getHotel(hotelID): Observable<any> {
        const token = localStorage.getItem('token');
        const url = myGlobals.ExternalURL + 'tour/get_hotel/' + parseInt(hotelID, 10) + '?token=' + token;
        return this.http.get<any>(url)
            .pipe(map((response: Response) => {
                return response;
            }), catchError((error: Response) => {
                return throwError(error.status);
            }));
    }

    searchResponse(country, departureCode, departure_date, arrival_date, adult_count, child_count,
        infant_count, babychair, city, region, subregion, tour_type, service_type): Observable<any> {
        const token = localStorage.getItem('token');
        const url = myGlobals.ExternalURL + 'tour/' + '?token=' + token;
        const params = new HttpParams().set('country', country).set('departureCode', departureCode).set('departure_date', departure_date)
        .set('arrival_date', arrival_date).set('adult_count', adult_count).set('child_count', child_count).set('infant_count', infant_count)
        .set('babychair', babychair).set('city', city).set('region', region).set('subregion', subregion).set('tour_type', tour_type)
        .set('service_type', service_type);
        return this.http.get<any>(url, {params})
            .pipe(map((response: Response) => {
                return response;
            }), catchError((error: Response) => {
                return throwError(error.status);
            }));
    }

    tourAPIdetails(tourID, tfID, request, apiID, sessionID): Observable<any> {
        const token = localStorage.getItem('token');
        const url = myGlobals.ExternalURL + 'tour/tour_details/' + '?token=' + token;
        const params = new HttpParams().set('tour_id', tourID).set('tf_id', tfID).set('request', request)
        .set('api_id', apiID).set('session_id', sessionID);
        return this.http.get<any>(url, {params})
            .pipe(map((response: Response) => {
                return response;
            }), catchError((error: Response) => {
                return throwError(error.status);
            }));
    }

    addToCartAPI(paramsData): Observable<any> {
        const token = localStorage.getItem('token');
        const url = myGlobals.ExternalURL + 'tour/addToCart/?' + paramsData +'&token=' + token;
        return this.http.get<any>(url)
            .pipe(map((response: Response) => {
                return response;
            }), catchError((error: Response) => {
                return throwError(error.status);
            }));
    }
}
