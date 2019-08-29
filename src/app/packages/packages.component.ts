import {Component, OnInit} from '@angular/core';
import {Options} from 'ng5-slider';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {PackageService} from '../service/package.service';

declare var $: any;

@Component({
    selector: 'app-packages',
    templateUrl: './packages.component.html',
    styleUrls: ['./packages.component.css']
})
export class PackagesComponent implements OnInit {

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

    constructor(private router: Router, private route: ActivatedRoute, private _PackageService: PackageService) {
    }

    ngOnInit() {
        this.searchStar = this.startArray;
        $(document).ready(function () {
            $('.ng5-slider-bubble').css('color', '#FFFFFF');
        });
        this.route.queryParams.subscribe(params => {
            this.urlParamsData(params['trip_date'], params['holiday_type'], params['city']);
        });
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0);
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

    urlParamsData(trip_date, holiday_type, city) {
        this.loading = true;
        this._PackageService.searchQueryAPI(trip_date, holiday_type, city).subscribe(
            success => {
                if (success.status) {
                    this._PackageService.getSearchData(success.query).subscribe(
                        results => {
                            if (results.status) {
                                const apiID = results['api_det'];
                                this._PackageService.getSearchApiData(results['request'], results['session_data'], apiID).subscribe(
                                    data => {
                                        this.loading = false;
                                        if (data['status']) {
                                            this.arryCheck = true;
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
    }

    facilityToggle(e, val) {
        this.marked = e.target.checked;
        const index = this.facilityArray.indexOf(val);
        if (this.facilityArray.includes(val)) {
            this.facilityArray.splice(index, 1);
        } else {
            this.facilityArray.push(val);
        }
    }

    resetFilter() {
        this.searchMaxAmount = this.max_val;
        this.searchMinAmount = this.min_val;
        this.maxValue = this.max_val;
        this.minValue = this.min_val;
        this.searchStar = '';
    }

    onFilterRatingClick(m) {
        const value = m.toString();
        this.searchStar = value;
    }

    onFacilityClick(m) {
        this.facilityArray = m;
    }

}
