import * as myGlobals from '../global';
import { Injectable, Directive } from '@angular/core';
import {HttpClient, HttpHeaders,  HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    constructor(private http: HttpClient) {}

    getSiteCurrency() {
        return this.http.get<any>(myGlobals.BaseUrl + 'home/get_site_currencies')
            .pipe(map(currency => {
                return currency;
            }));
    }

    getSiteLanguages() {
        return this.http.get<any>(myGlobals.BaseUrl + 'home/get_site_languages')
            .pipe(map(language => {
                return language;
            }));
    }

    login(user_type_name: string, email: string, password: string, ip: any, country: string, city: string, currency: string): Observable<any> {
        const formData = new FormData();
        formData.append('user_type_name', user_type_name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('ip', ip);
        formData.append('country', country);
        formData.append('city', city);
        formData.append('currency', currency);

        return this.http.post(myGlobals.BaseUrl + 'account/login', formData)
            .pipe(map((response: Response) => {
                return response;
            }), catchError((error: Response) => {
                return throwError(error.status);
            }));
    }


    b2cLogin(email: string, password: string): Observable<any> {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        return this.http.post<any>(myGlobals.ExternalUrl + 'home/login', formData)
            .pipe(map(result => {
                return result;
            }));
    }

    accountLogin(userType, email, password, sessionID, ipAddress, country, city, currency): Observable<any> {
        const url = myGlobals.ExternalURL + 'account/login';
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('user_type_name', userType);
        formData.append('session_id', sessionID);
        formData.append('ip_address', ipAddress);
        formData.append('api', 'api');
        return this.http.post<any>(url, formData)
            .pipe(map((response: Response) => {
                return response;
            }), catchError((error: Response) => {
                return throwError(error.status);
            }));
    }

    createWithEmail(userType, email, sessionID, pnCountryCode, pnMobilNo): Observable<any> {
        const url = myGlobals.ExternalURL + 'account/create_with_email';

        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', '');
        formData.append('user_type_name', userType);
        formData.append('session_id', sessionID);
        formData.append('pn_mobil_no', pnMobilNo);
        formData.append('pn_country_code', pnCountryCode);
        return this.http.post<any>(url, formData)
            .pipe(map((response: Response) => {
                return response;
            }), catchError((error: Response) => {
                return throwError(error.status);
            }));
    }

    getCountries(): Observable<any> {
        const url = myGlobals.ExternalUrl + 'home/index';
        return this.http.get<any>(url)
            .pipe(map((response: Response) => {
                return response;
            }), catchError((error: Response) => {
                return throwError(error.status);
            }));
    }

    getAPIurl(formedURL): Observable<any> {
        const token = localStorage.getItem('token');
        const url = myGlobals.ExternalURL + 'hotel/search?' + formedURL + '&token=' + token;
        return this.http.get<any>(url)
            .pipe(map((response: Response) => {
                return response;
            }), catchError((error: Response) => {
                return throwError(error.status);
            }));
    }

    getSearchData(params): Observable<any> {
        const token = localStorage.getItem('token');
        const url = myGlobals.ExternalURL + params + '&token=' + token;
        return this.http.get<any>(url)
            .pipe(map((response: Response) => {
                return response;
            }), catchError((error: Response) => {
                return throwError(error.status);
            }));
    }

    getSearchApiData(request, sessiondata, apiID): Observable<any> {
        const token = localStorage.getItem('token');
        const url = myGlobals.ExternalURL + 'hotel/call_api/' + parseInt(apiID, 10) + '?token=' + token;
        const params = new HttpParams().set('request', request).set('sessiondata', sessiondata);
        return this.http.get<any>(url, {params})
            .pipe(map((response: Response) => {
                return response;
            }), catchError((error: Response) => {
                return throwError(error.status);
            }));
    }


    getHotelDetails(id, hotel_code, request_data, api_id): Observable<any> {
        const token = localStorage.getItem('token');
        const url = myGlobals.ExternalURL + 'hotel/hotel_details?' + '&token=' + token;
        const params = new HttpParams().set('id', id).set('hotel_code', hotel_code).set('request_data', request_data).set('api_id', api_id);

        return this.http.get<any>(url, {params})
            .pipe(map((response: Response) => {
                return response;
            }), catchError((error: Response) => {
                return throwError(error.status);
            }));
    }

    getRoomDetails(hotel_code, request, api_id): Observable<any> {
        const token = localStorage.getItem('token');
        const url = myGlobals.ExternalURL + 'hotel/get_room_details_gta?' + '&token=' + token;
        const params = new HttpParams().set('hotel_code', hotel_code).set('request', request).set('api_id', api_id);
        return this.http.get<any>(url, {params})
            .pipe(map((response: Response) => {
                return response;
            }), catchError((error: Response) => {
                return throwError(error.status);
            }));
    }

    bookRoomApi(roomIndex, hotelID, apiID, latitude, longitude): Observable<any> {
        const token = localStorage.getItem('token');
        const url = myGlobals.ExternalURL + 'hotel/addToCart_gta';
        const params = new HttpParams().set('hotel_id', hotelID).set('room_index', roomIndex).set('api_id', apiID).set('lat', latitude)
            .set('lon', longitude).set('token', token);

        const formData = new FormData();
        formData.append('hotel_id', hotelID);
        formData.append('room_index', roomIndex);
        formData.append('api_id', apiID);
        formData.append('lat', latitude);
        formData.append('lon', longitude);
        formData.append('token', token);
        return this.http.post<any>(url, formData)
            .pipe(map((response: Response) => {
                return response;
            }), catchError((error: Response) => {
                return throwError(error.status);
            }));
    }

    hoteReview(session): Observable<any> {
        const token = localStorage.getItem('token');
        const url = 'https://flyantalya.api.smtech-solution.net/booking/?' + '&token=' + token;
        const params = new HttpParams().set('session', session);
        return this.http.get<any>(url, {params})
            .pipe(map((response: Response) => {
                 console.log(response);
                return response;
            }), catchError((error: Response) => {
                return throwError(error.status);
            }));
    }

    bookingTraveller(secdata): Observable<any> {
        const token = localStorage.getItem('token');
        const url = myGlobals.ExternalURL + 'booking/booking_travellers/?' + 'token=' + token;
        const params = new HttpParams().set('secdata', secdata);
        return this.http.get<any>(url, {params})
            .pipe(map((response: Response) => {
                 console.log(response);
                return response;
            }), catchError((error: Response) => {
                return throwError(error.status);
            }));
    }

    checkOutAPI(formData): Observable<any> {
        const token = localStorage.getItem('token');
        const url = myGlobals.ExternalURL + 'booking/checkout/?' + 'token=' + token + '&' + formData;
        return this.http.get<any>(url)
            .pipe(map((response: Response) => {
                return response;
            }), catchError((error: Response) => {
                return throwError(error.status);
            }));
    }

    promCoDeApi(promo, total, cid): Observable<any> {
        const token = localStorage.getItem('token');
        const url = myGlobals.ExternalURL + 'booking/promo/?' + 'token=' + token;
        const params = new HttpParams().set('code', promo).set('total', total).set('cid', cid);
        return this.http.get<any>(url, {params})
            .pipe(map((response: Response) => {
                return response;
            }), catchError((error: Response) => {
                return throwError(error.status);
            }));
    }

    bookAPI(parent_pnr): Observable<any> {
        const token = localStorage.getItem('token');
        const url = myGlobals.ExternalURL + 'booking/book/?' + 'token=' + token;
        const params = new HttpParams().set('parent_pnr', parent_pnr);
        return this.http.get<any>(url, {params})
            .pipe(map((response: Response) => {
                return response;
            }), catchError((error: Response) => {
                return throwError(error.status);
            }));
    }

    bookingConfirm(parent_pnr): Observable<any> {
        const token = localStorage.getItem('token');
        const url = myGlobals.ExternalURL + 'booking/confirm/?' + 'token=' + token;
        const params = new HttpParams().set('parent_pnr', parent_pnr);
        return this.http.get<any>(url, {params})
            .pipe(map((response: Response) => {
                return response;
            }), catchError((error: Response) => {
                return throwError(error.status);
            }));
    }

     voucherRetrive(parent_pnr): Observable<any> {
         const token = localStorage.getItem('token');
        const url = myGlobals.ExternalURL + 'booking/confirm/?' + 'token=' + token;
        const params = new HttpParams().set('parent_pnr', parent_pnr);
        return this.http.get<any>(url, {params})
            .pipe(map((response: Response) => {
                return response;
            }), catchError((error: Response) => {
                return throwError(error.status);
            }));
    }

}
