import * as myGlobals from '../global';
import {Injectable, Directive} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class HomeService {

    constructor(private http: HttpClient) {
    }

    getTrendyDeals() {
        return this.http.get<any>(myGlobals.BaseUrl + 'home/get_trendy_deals')
            .pipe(map(trendydeal => {
                return trendydeal;
            }));
    }

    getTopDeals() {
        return this.http.get<any>(myGlobals.BaseUrl + 'home/get_top_deals')
            .pipe(map(topdeals => {
                return topdeals;
            }));
    }

    getSpecialDeals() {
        return this.http.get<any>(myGlobals.BaseUrl + 'home/get_special_deals')
            .pipe(map(speacialdeals => {
                return speacialdeals;
            }));
    }

    getTopDestinations() {
        return this.http.get<any>(myGlobals.BaseUrl + 'home/get_top_destinations')
            .pipe(map(topdest => {
                return topdest;
            }));
    }

    getBestPackages() {
        return this.http.get<any>(myGlobals.BaseUrl + 'home/get_best_packages')
            .pipe(map(bestpack => {
                return bestpack;
            }));
    }

    doSubscribe(email: string): Observable<any> {
        const formData = new FormData();
        formData.append('email', email);

        return this.http.post(myGlobals.ExternalUrl + 'home/subscribe', formData)
            .pipe(map((response: Response) => {
                return response;
            }), catchError((error: Response) => {
                return throwError(error.status);
            }));
    }

    getSocialPageLink() {
        return this.http.get<any>(myGlobals.ExternalUrl + 'home/get_social_page_link')
            .pipe(map(result => {
                return result;
            }));
    }


}
