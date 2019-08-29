import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import * as myGlobals from '../global';
import {catchError, map, tap} from 'rxjs/operators';
import {throwError, Observable, of} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class B2bDepositManagementService {

    constructor(private http: HttpClient) {
    }

    addDeposit(banking_type, check_number, bank_name, bank_branch, bank_city, amount, currency, bank_date, remarks, userfile, banking): Observable<any> {

       /* console.log('banking_type', banking_type);
        console.log('check_number', check_number);
        console.log('bank_name', bank_name);
        console.log('bank_branch', bank_branch);
        console.log('bank_city', bank_city);
        console.log('amount', amount);
        console.log('currency', currency);
        console.log('bank_date', bank_date);
        console.log('remarks', remarks);
        console.log('userfile', userfile);
        console.log('banking', banking);*/

        const url = myGlobals.ExternalUrl + 'account/saveDeposit';
        const token = localStorage.getItem('token');
        const params = new HttpParams().set('token', token);
        const formData = new FormData();
        // formData.append('user_type_name', 'B2B');
        formData.append('token', token);
        formData.append('banking_type', banking_type);
        formData.append('check_number', check_number);
        formData.append('bank_name', bank_name);
        formData.append('bank_branch', bank_branch);
        formData.append('bank_city', bank_city);
        formData.append('amount', amount);
        formData.append('currency', currency);
        formData.append('bank_date', bank_date);
        formData.append('remarks', remarks);
        formData.append('banking_types', banking);

        if (userfile !== undefined) {
            formData.append('userfile', userfile, userfile.name);
        }

        return this.http.post<any>(url, formData)
        .pipe(map((response: Response) => {
            return response;
        }), catchError((error: Response) => {
            return throwError(error.status);
        }));
    }


    getDepositList(): Observable<any> {

        const url = myGlobals.ExternalUrl + 'dashboard/deposit';
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
