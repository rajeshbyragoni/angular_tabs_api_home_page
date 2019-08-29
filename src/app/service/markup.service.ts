import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import * as myGlobals from '../global';
import {catchError, map, tap} from 'rxjs/operators';
import {throwError, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarkupService {

  constructor(private http: HttpClient) {}


/***** generic start here ****/

  genericNewData(product_id, Markup, markup_type): Observable<any> {

    const url = myGlobals.ExternalUrl + 'dashboard/save_general_markup                                                                                                                                                                                                                                                                                                                                                                                                                     ';
    const token = localStorage.getItem('token');
    const params = new HttpParams().set('token', token);
    const formData = new FormData();

    formData.append('token', token);
    formData.append('product_id', product_id);
    formData.append('Markup', Markup);
    formData.append('markup_type', markup_type);
    
    

    return this.http.post<any>(url, formData)
    .pipe(map((response: Response) => {
      return response;
    }), catchError((error: Response) => {
      return throwError(error.status);
    }));

  }


  genericMarkup(): Observable<any> {
    const url = myGlobals.ExternalUrl + 'dashboard/generic_markup';
    const token = localStorage.getItem('token');
    const params = new HttpParams().set('token', token);
    return this.http.get<any>(url, {params})
    .pipe(map((response: Response) => {
      return response;
    }), catchError((error: Response) => {
      return throwError(error.status);
    }));
  }

/***** generic end here ****/

  countryNewData(product_id, country, Markup, markup_type): Observable<any> {

    const url = myGlobals.ExternalUrl + 'dashboard/save_country_markup                                                                                                                                                                                                                                                                                                                                                                                                                     ';
    const token = localStorage.getItem('token');
    const params = new HttpParams().set('token', token);
    const formData = new FormData();

    formData.append('token', token);
    formData.append('product_id', product_id);
    formData.append('Markup', Markup);
    formData.append('markup_type', markup_type);
    
    

    return this.http.post<any>(url, formData)
    .pipe(map((response: Response) => {
      return response;
    }), catchError((error: Response) => {
      return throwError(error.status);
    }));

  }

    countryMarkup(): Observable<any> {
    const url = myGlobals.ExternalUrl + 'dashboard/country_markup';
    const token = localStorage.getItem('token');
    const params = new HttpParams().set('token', token);
    return this.http.get<any>(url, {params})
    .pipe(map((response: Response) => {
      return response;
    }), catchError((error: Response) => {
      return throwError(error.status);
    }));
  }




  /***** specific start here ****/

  specificNewData(user, product_id, country, airline, flight_type, first, Markup, markup_type): Observable<any> {

    const url = myGlobals.ExternalUrl + 'dashboard/save_specific_markup                                                                                                                                                                                                                                                                                                                                                                                                                     ';
    const token = localStorage.getItem('token');
    const params = new HttpParams().set('token', token);
    const formData = new FormData();

    formData.append('token', token);
    formData.append('user', user);
    formData.append('product_id', product_id);
    formData.append('country', country);
    formData.append('airline', airline);
    formData.append('flight_type', flight_type);
    formData.append('first', first);
    formData.append('Markup', Markup);
    formData.append('markup_type', markup_type);
    
    

    return this.http.post<any>(url, formData)
    .pipe(map((response: Response) => {
      return response;
    }), catchError((error: Response) => {
      return throwError(error.status);
    }));

  }

    specificMarkup(): Observable<any> {
    const url = myGlobals.ExternalUrl + 'dashboard/specific_markup';
    const token = localStorage.getItem('token');
    const params = new HttpParams().set('token', token);
    return this.http.get<any>(url, {params})
    .pipe(map((response: Response) => {
      return response;
    }), catchError((error: Response) => {
      return throwError(error.status);
    }));
  }
    specificProduct(id): Observable<any> {
    const url = myGlobals.ExternalUrl + 'dashboard/get_specific_markup/' + id;
    const token = localStorage.getItem('token');
    const params = new HttpParams().set('token', token);
    return this.http.get<any>(url, {params})
    .pipe(map((response: Response) => {
      return response;
    }), catchError((error: Response) => {
      return throwError(error.status);
    }));
  }
    /***** specific end here ****/





}
