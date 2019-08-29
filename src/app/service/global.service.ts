import { Injectable, Directive } from '@angular/core';
import {HttpClient, HttpHeaders,  HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import * as myGlobals from '../global';
declare var $: any;

@Injectable()
export class GlobalService {
    private currency: string;
    // private countryURL = 'http://192.168.1.12/travel2plan/angular_api/account/get_all_country';
    // private stateURL = 'http://192.168.1.12/travel2plan/angular_api/account/get_city';
    // private currencyURL = 'http://192.168.1.12/travel2plan/angular_api/home/getCurrecy';

    constructor(private http: HttpClient) {}

    setCurrency(val) {
        this.currency = val;
    }

    getCurrency() {
        return this.currency;
    }


    getCountry(): Observable<any> {
        const url = myGlobals.ExternalUrl + 'account/get_all_country';
        const token = localStorage.getItem('token');

        return this.http.get<any>(url)
        .pipe(map((response: Response) => {
            return response;
        }), catchError((error: Response) => {
            return throwError(error.status);
        }));
    }

    getState(country): Observable<any> {
        return this.http.get<any>(myGlobals.ExternalUrl + '?country=' + country)
        .pipe(map((response: Response) => {
            return response;
        }), catchError((error: Response) => {
            return throwError(error.status);
        }));
    }

    getAllCurrency(): Observable<any> {
        return this.http.get<any>(myGlobals.ExternalUrl + 'home/getCurrecy' )
        .pipe(map((response: Response) => {
            return response;
        }), catchError((error: Response) => {
            return throwError(error.status);
        }));
    }

    generatePWD() {
        const maxAlpha = 26;
        const strSymbols = '~!@#$%^&*(){}?><`=-|][';
        let password = '';
        for (let i = 0; i < 3; i++) {
            password += String.fromCharCode('a'.charCodeAt(0) + this.getRand(maxAlpha));
        }
        for (let i = 0; i < 3; i++) {
            password += String.fromCharCode('A'.charCodeAt(0) + this.getRand(maxAlpha));
        }
        for (let i = 0; i < 3; i++) {
            password += String.fromCharCode('0'.charCodeAt(0) + this.getRand(10));
        }
        for (let i = 0; i < 4; i++) {
            password += strSymbols.charAt(this.getRand(strSymbols.length));
        }

        password = this.shuffleString(password);
        password = this.shuffleString(password);
        password = this.shuffleString(password);

        return password;
    }

    getRand(max) {
        return (Math.floor(Math.random() * max));
    }

    shuffleString(mystr) {
        const arrPwd = mystr.split('');

        for (let i = 0; i < mystr.length; i++) {
            const r1 = i;
            const r2 = this.getRand(mystr.length);

            const tmp = arrPwd[r1];
            arrPwd[r1] = arrPwd[r2];
            arrPwd[r2] = tmp;
        }

        return arrPwd.join('');
    }
}
