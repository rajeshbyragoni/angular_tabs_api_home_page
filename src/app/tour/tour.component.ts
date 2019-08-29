import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {TourService} from '../service/tour.service';
import {TextPipe} from '../pipes/text.pipe';

declare var $: any;

@Component({
    selector: 'app-tour',
    templateUrl: './tour.component.html',
    styleUrls: ['./tour.component.css']
})
export class TourComponent implements OnInit {

    value: any;
    loading = false;
    searchLoading = false;
    cityArray: any = [];
    regionArray: any = [];
    subRegionArray: any = [];
    tourTypearray: any = [];
    results: any;
    arryCheck: any;
    reqData: any;
    citySearch = false;
    session_id: any;

    constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private textPipe: TextPipe, private _TourService: TourService) {
    }

    ngOnInit() {
        $(document).ready(function () {
            $('.ng5-slider-bubble').css('color', '#FFFFFF');
        });
        this.route.queryParams.subscribe(params => {
            this.urlParamsData(params['data']);
        });
    }

    urlParamsData(params) {
        this.loading = true;
        this._TourService.getTourAPIurl(params).subscribe(
            success => {
                if (success.status) {
                    this._TourService.getSearchData(success.query).subscribe(
                        results => {
                            if (results.status) {
                                const a1 = results['api_det'].replace('\'', '');
                                const api_det_tour = a1.replace('\'', '');
                                this._TourService.getSearchApiData(results['request'], results['session_data'], api_det_tour).subscribe(
                                    data => {
                                        if (data['status']) {
                                            this.session_id  = data.session_id;
                                            this.tourTypearray = data['tourType'];
                                            this.arryCheck = true;
                                            this.cityArray = data.city;
                                            this.loading = false;
                                            this.results = data;
                                            this.reqData = data.tour_data.request;
                                        } else {
                                            this.arryCheck = false;
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

    searchRes() {
        const country = $('input[name=\'country\']').val();
        const depCode = $('input[name=\'departureCode\']').val();
        const depdate = $('input[name=\'departure_date\']').val();
        const arrdate = $('input[name=\'arrival_date\']').val();
        const aducount = $('input[name=\'adult_count\']').val();
        const chicount = $('input[name=\'child_count\']').val();
        const infcount = $('input[name=\'infant_count\']').val();
        const babychair = $('input[name=\'babychair\']').val();
        const city = $('#tour_city :selected').val();
        const region = $('#tour_region :selected').val();
        const subregion = $('#tour_subregion :selected').val();
        const tour_type = $('#tour_type :selected').val();
        const service_type = $('#service_type :selected').val();
        if (city != '' && city != undefined) {
            this.citySearch = true;
            this.searchLoading = true;
            this._TourService.searchResponse(country, depCode, depdate, arrdate, aducount, chicount, infcount, babychair, city, region, subregion,
                tour_type, service_type).subscribe(results => {
                    if (results.status) {
                        const a1 = results['api_det'].replace('\'', '');
                        const api_det_tour = a1.replace('\'', '');
                        this._TourService.getSearchApiData(results['request'], this.session_id, api_det_tour).subscribe(
                            data => {
                                this.searchLoading = false;
                                if (data['status']) {
                                    this.arryCheck = true;
                                    this.results = data;
                                    this.reqData = data.tour_data.request;
                                } else {
                                    this.arryCheck = false;
                                }
                            }, error => {
                                console.log(error.toString());
                            }
                            );
                    }
                }, error => {
                    console.log(error.toString());
                });
            }
    }

    getRegion($event) {
        const regionID = $event.target.value;
        this._TourService.getRegion(regionID).subscribe(results => {
            this.regionArray = results;
        }, error => {
            console.log(error.toString());
        });
    }

    getSubregion($event) {
        const subRegionID = $event.target.value;
        this._TourService.getSubRegion(subRegionID).subscribe(results => {
            this.subRegionArray = results;
        }, error => {
            console.log(error.toString());
        });
    }

    getHotel($event) {
        const hotelID = $event.target.value;
        this._TourService.getSubRegion(hotelID).subscribe(results => {
            this.subRegionArray = results;
        }, error => {
            console.log(error.toString());
        });
    }
}
