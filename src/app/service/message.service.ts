import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class MessageService {
    private _listners = new Subject<any>();
    private _listnerrd = new Subject<any>();
    private _listnerrs = new Subject<any>();

    starRatingListen(): Observable<any> {
        return this._listners.asObservable();
    }

    facilityListen(): Observable<any> {
        return this._listnerrd.asObservable();
    }
    roomFacilityListen(): Observable<any> {
        return this._listnerrs.asObservable();
    }

    filter(filterBy: any) {
        this._listners.next(filterBy);
    }

    facilityFilter(filterBy: any) {
        this._listnerrd.next(filterBy);
    }

    roomFacilityFilter(filterBy: any) {
        this._listnerrs.next(filterBy);
    }
    
}
