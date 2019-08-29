import {Component, OnInit} from '@angular/core';
import {Options} from 'ng5-slider';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {CommonService} from '../service/common.service';
import {MessageService} from '../service/message.service';
import {TextPipe} from '../pipes/text.pipe';
import {FormControl, FormGroup} from '@angular/forms';

declare var $: any;

@Component({
    selector: 'app-hotels',
    templateUrl: './hotels.component.html',
    styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {

    value: any;
    facilityArray: any;
    seletRating: any;
    marked = false;
    theCheckbox = false;
    minValue: number;
    maxValue: number;
    options: Options = {
        floor: 0,
        ceil: 100,
        step: 1
    };
    loading = false;
    startArray: any = [];
    results: any;
    arryCheck: any;
    searchStar: '';
    searchMinAmount: any;
    searchMaxAmount: any;
    min_val: any;
    max_val: any;

    public searchText: string;
    public customerData: any;

    sliderForm: FormGroup = new FormGroup({
        sliderControl: new FormControl([20, 80])
    });

    constructor(private _messageService: MessageService, private router: Router, private route: ActivatedRoute, private http: HttpClient,
                private _CommonService: CommonService, private textPipe: TextPipe) {
        this._messageService.starRatingListen().subscribe((m: any) => {
            this.onFilterRatingClick(m);
        });
        this._messageService.facilityListen().subscribe((m: any) => {
            this.onFacilityClick(m);
        });
    }

    clickFilter(id): void {
        this._messageService.filter(id);
    }

    ngOnInit() {
        this.searchStar = this.startArray;
        $(document).ready(function () {
            $('.ng5-slider-bubble').css('color', '#FFFFFF');
            // $('.ng5-slider-pointer').css('width', '26px');
            // $('.ng5-slider-pointer').css('height', '26px');
            // $('.ng5-slider-pointer').after(function () {
            // $('.ng5-slider-pointer').css('top', '10px');
            // $('.ng5-slider-pointer').css('left', '11px');
            // });
        });
        this.route.queryParams.subscribe(params => {
            this.urlParamsData(params['data']);
        });

    }

    filter(minValue, maxValue) {
        if (maxValue) {
            this.searchMaxAmount = maxValue;
        }
        if (minValue) {
           this.searchMinAmount = minValue;
        }
    }

    urlParamsData(params) {
        this.loading = true;
        this._CommonService.getAPIurl(params).subscribe(
            success => {
                if (success.status) {
                    this._CommonService.getSearchData(success.url).subscribe(
                        results => {
                            if (results.status) {
                                const a1 = results['api_det_hotel'].replace('\'', '');
                                const api_det_hotel = a1.replace('\'', '');
                                this._CommonService.getSearchApiData(results['request'], results['session_data'], api_det_hotel).subscribe(
                                    data => {
                                        if (data['status']) {
                                            this.arryCheck = true;
                                            this.loading = false;
                                            this.results = data;
                                            this.maxValue = data.max_val;
                                            this.max_val = data.max_val;
                                            this.min_val = data.min_val;
                                            this.searchMaxAmount = data.max_val;
                                            this.searchMinAmount = data.min_val;
                                            this.minValue = data.min_val;
                                            this.options.floor = parseInt(data.min_val, 0);
                                            this.options.ceil = parseInt(data.max_val, 0);
                                        } else {
                                            this.arryCheck = false;
                                            this.maxValue = 100;
                                            this.options.floor = 50;
                                            this.options.ceil = 60;
                                            this.minValue = 1;
                                            this.loading = false;
                                        }
                                    }, error => {
                                        console.log(error.toString());
                                    }
                                );
                            }
                        }
                    );
                }
            }
        );
    }

    toggleVisibility(e, val) {
        this.marked = e.target.checked;
        const index = this.startArray.indexOf(val);
        if (this.startArray.includes(val)) {
            this.startArray.splice(index, 1);
        } else {
            this.startArray.push(val);
        }
        this._messageService.filter(this.startArray);
    }

    facilityToggle(e, val) {
        this.marked = e.target.checked;
        const index = this.facilityArray.indexOf(val);
        if (this.facilityArray.includes(val)) {
            this.facilityArray.splice(index, 1);
        } else {
            this.facilityArray.push(val);
        }
        this._messageService.facilityFilter(this.facilityArray);
    }

    resetFilter() {
        this.searchMaxAmount = this.max_val;
        this.searchMinAmount = this.min_val;
        this.maxValue = this.max_val;
        this.minValue = this.min_val;
        this.searchStar = '';
        // $(".checkmark").after(function() {
        //     $(this).css("background-color", "#4d4d4d");
        // });
    }

    onFilterRatingClick(m) {
        const value = m.toString();
        this.searchStar = value;
    }

    onFacilityClick(m) {
        console.log(m);
        console.log('m');
        this.facilityArray = m;
    }

}
