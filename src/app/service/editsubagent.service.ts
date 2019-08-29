import { Injectable, Directive } from '@angular/core';
import {HttpClient, HttpHeaders,  HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import * as myGlobals from '../global';
import {catchError, map} from 'rxjs/operators';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class EditsubagentService {

  constructor(private http: HttpClient) {}

      editSubUser(company, iata, no_branch, c_person, c_designation, c_email, c_phone, o_address, o_city, country, o_pin, contact_no, email, pswd, profile_picture,
        licence_number, license_picture, currency_code, id): Observable<any> {
        //console.log('hi');
        const url = myGlobals.ExternalUrl + 'dashboard/subagent_update/' + id;
        const token = localStorage.getItem('token');
        const params = new HttpParams().set('token', token);
        const formData = new FormData();

        formData.append('token', token);
        formData.append('company', company);
        formData.append('iata', iata);
        formData.append('no_branch', no_branch);
        formData.append('c_person', c_person);
        formData.append('c_designation', c_designation);
        formData.append('c_email', c_email);
        formData.append('c_phone', c_phone);
        formData.append('o_address', o_address);
        formData.append('o_city', o_city);
        formData.append('country', country);
        formData.append('o_pin', o_pin);
        formData.append('contact_no', contact_no);
        formData.append('email', email);
        formData.append('pswd', pswd);
        formData.append('licence_number', licence_number);
        formData.append('license_picture', license_picture);
        formData.append('currency_code', currency_code);

        if (profile_picture !== undefined) {
            formData.append('profile_picture', profile_picture, profile_picture.name);
        }

        return this.http.post<any>(url, formData)
        .pipe(map((response: Response) => {
            return response;
        }), catchError((error: Response) => {
            return throwError(error.status);
        }));
    }

    getEditSubAgent(id): Observable<any> {
        const url = myGlobals.ExternalUrl + 'dashboard/edit_sub_agent/' + id;
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
