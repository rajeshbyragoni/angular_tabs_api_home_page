import { Injectable, Directive } from '@angular/core';
import {HttpClient, HttpHeaders,  HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class UserRegisterService {

    private registerURL = 'http://192.168.1.12/travel2plan/account/agent_create';

    constructor(private http: HttpClient) {}

    addUser(user_type_name, AgencyName, country, c_phone, Website, c_person, company, city, contact_no, Surname, currency, o_pin, Fax, c_designation, Email, new_password,
            Iata, o_address, HowHear, profile_picture): Observable<any> {

        const formData = new FormData();
        formData.append('user_type_name', 'B2B');
        formData.append('AgencyName', AgencyName);
        formData.append('country', country);
        formData.append('c_phone', c_phone);
        formData.append('Website', Website);
        formData.append('c_person', c_person);
        formData.append('company', company);
        formData.append('city', city);
        formData.append('contact_no', contact_no);
        formData.append('Surname', Surname);
        formData.append('currency', currency);
        formData.append('o_pin', o_pin);
        formData.append('Fax', Fax);
        formData.append('c_designation', c_designation);
        formData.append('Email', Email);
        formData.append('password', new_password);
        formData.append('Iata', Iata);
        formData.append('o_address', o_address);
        formData.append('HowHear', HowHear);

        if (profile_picture !== undefined) {
            formData.append('profile_picture', profile_picture, profile_picture.name);
        }

        return this.http.post<any>(this.registerURL, formData)
            .pipe(map((response: Response) => {
                return response;
            }), catchError((error: Response) => {
                return throwError(error.status);
            }));
    }
}
