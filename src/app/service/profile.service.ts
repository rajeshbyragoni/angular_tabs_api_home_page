import {Injectable, Directive} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import * as myGlobals from '../global';
import {catchError, map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    constructor(private http: HttpClient) {
    }

    addProfile(AgencyName, city, address, zip_code, Fax, c_phone, Website, contact_no, Email, c_person, Surname, company, currency, c_designation, Iata, profile_picture,
               licence_number, license_picture): Observable<any> {

        const url = myGlobals.ExternalUrl + 'dashboard/updateProfile                                                                                                                                                                                                                                                                                                                                                                                                                     ';
        const token = localStorage.getItem('token');
        const params = new HttpParams().set('token', token);
        const formData = new FormData();

        formData.append('token', token);
        formData.append('AgencyName', AgencyName);
        formData.append('city', city);
        formData.append('address', address);
        formData.append('zip_code', zip_code);
        formData.append('Fax', Fax);
        formData.append('c_phone', c_phone);
        formData.append('c_phone', c_phone);
        formData.append('Website', Website);
        formData.append('contact_no', contact_no);
        formData.append('Email', Email);
        formData.append('c_person', c_person);
        formData.append('Surname', Surname);
        formData.append('company', company);
        formData.append('currency', currency);
        formData.append('c_designation', c_designation);
        formData.append('Iata', Iata);
        formData.append('licence_number', licence_number);

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

    getProfileList(): Observable<any> {
        const url = myGlobals.ExternalUrl + 'dashboard/profile';
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
