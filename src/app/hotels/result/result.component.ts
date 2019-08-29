import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from '../../service/message.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import * as myGlobals from '../../global';
import {CommonService} from '../../service/common.service';
declare var $: any;

@Component({
    selector: 'app-result',
    templateUrl: './result.component.html',
    styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

    value: any;
    facilityArray: any;
    seletRating: any;

    constructor(private _messageService: MessageService, private router: Router, private route: ActivatedRoute, private http: HttpClient,
                private _CommonService: CommonService) {
        this._messageService.starRatingListen().subscribe((m: any) => {
            this.onFilterRatingClick(m);
        });
        this._messageService.facilityListen().subscribe((m: any) => {
            this.onFacilityClick(m);
        });
    }

    ngOnInit() {
      
    }

    onFilterRatingClick(m) {
        console.log(m);
        this.seletRating = m;
    }

    onFacilityClick(m) {
        console.log(m);
        console.log('m');
        this.facilityArray = m;
    }
}
