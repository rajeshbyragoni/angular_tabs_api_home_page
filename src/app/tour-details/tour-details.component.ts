import {Component, OnInit} from '@angular/core';
import {TourService} from '../service/tour.service';
import {ActivatedRoute, Router} from '@angular/router';

declare var $: any;
declare var jQuery: any;

@Component({
    selector: 'app-tour-details',
    templateUrl: './tour-details.component.html',
    styleUrls: ['./tour-details.component.css']
})
export class TourDetailsComponent implements OnInit {

    loading = false;
    images: any;
    tour_det: any = [];
    tour_days: any = [];
    countryArray: any = [];
    tourName: any;
    request_data: any = [];
    date_picker: any = [];
    aducnt: any = [];
    chilcnt: any = [];
    infcnt: any = [];
    wkdays: any;
    extraPay: any;
    lang: any;
    pickup: any;
    weekarray = {
        'SUN': 'SUNDAY',
        'MON': 'MONDAY',
        'TUE': 'TUESDAY',
        'WED': 'WEDNESDAY',
        'THU': 'THURSDAY',
        'FRI': 'FRIDAY',
        'SAT': 'SATURDAY'
    };
    weekdays = {'SUN': 0, 'MON': 1, 'TUE': 2, 'WED': 3, 'THU': 4, 'FRI': 5, 'SAT': 6};
    c_a = 'USD';
    c_val = 1;

    constructor(private _TourService: TourService, private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.tourData(params['tour_id'], params['tf_id'], params['request_data'], params['api_id'], params['session_id']);
        });
    }

    tourData(tourID, tfID, request, apiID, sessionID) {
        this.loading = true;
        this._TourService.tourAPIdetails(tourID, tfID, request, apiID, sessionID).subscribe(
            dataReady => {
                this.loading = false;
                if (dataReady.status) {
                    console.log(dataReady);
                    this.tour_det = dataReady.tour_det;
                    this.tour_days = dataReady.tour_days;
                    this.request_data = dataReady.request_data;
                    this.tourName = dataReady.tour_det.tour_name;
                    this.countryArray = dataReady.countries;
                    this.aducnt = dataReady.aducnt;
                    this.chilcnt = dataReady.chilcnt;
                    this.infcnt = dataReady.infcnt;
                    this.extraPay = dataReady.extraPay;
                    this.date_picker = dataReady.date_picker;
                    this.lang = dataReady.lang;
                    this.pickup = dataReady.pickup;
                    this.wkdays = dataReady.tour_det.allow_weekdays.split(',');
                    this.images = dataReady.tour_det.images.split(',');
                    this.paxAndChild();
                }
            }, error => {
                console.log(error.toString());
            }
        );
    }

    splitinData(jsonVal) {
        const variabl = jsonVal.split(',');
        return variabl;
    }

    paxAndChild() {
        $(document).ready(function () {
            let adult_price = $('#per_adult_price').val();
            let child_price = $('#per_child_price').val();

            let adult_count = $('#adult_count').val();
            aduktcnt(adult_price, adult_count);
            $('#adult_count').on('change', function () {
                aduktcnt(adult_price, $('#adult_count').val());
            });
            const chuk = $('#child_count').val();
            chitcount(child_price, chuk);
            $('#child_count').on('change', function () {
                chitcount(child_price, $('#child_count').val());
            });

            function chitcount(child_price, child_count) {
                const cr = child_price * child_count;
                $('.child_total_price_span').text(cr);
                $('.child_total_price').text(cr);
            }

            function aduktcnt(price, count) {
                const pr = price * count;
                $('.adult_total_price_span').text(pr);
                $('.adult_total_price').val(pr);
            }

            const adult = $('.adult_total_price_span').text();
            const child = $('.child_total_price').text() || 0;
            const infant = $('.infant_total_price').text() || 0;
            totalcount(adult, child, infant);
            $('.reset_room').on('change', function () {
                const adultq = $('.adult_total_price_span').text();
                const childq = $('.child_total_price').text() || 0;
                const infantq = $('.infant_total_price').text() || 0;
                totalcount(adultq, childq, infantq);
            });

            function totalcount(adult, child, infant) {
                const total = parseFloat(adult) + parseFloat(child) + parseFloat(infant);
                $('#total_price_tag').text(total);
                $('.fnlPrice').text(total);
                $('.sub_total').text(total);
            }

            // let b = 0;
            // const adlpric = $('#per_adult_price').val();
            // const adlcnt = $('#adult_count').val();
            // console.log(parseInt(adlcnt, 10));
            // $('#total_price_tag').val(parseInt(adlcnt, 10));
        });
        $(document).on('change', '#child_count', function (e) {
            const child_count = $(this).val();
            $('#child_age').html('');
            const min_child_age = parseInt($('#min_child_age').val());
            const max_child_age = parseInt($('#max_child_age').val());
            let elements = '';
            let selectElement = '';
            for (var k = min_child_age; k <= max_child_age; k++) {
                selectElement = selectElement + '<option value="' + k + '">' + k + '</option>';
            }
            for (var i = 1; i <= child_count; i++) {
                elements = elements + '<div class="marginbotom10">' + ' Child ' + i + ' Age<div class="selectedwrap"><select required="" name="child_ages[]" id="child_ages" class="mySelectBoxClass flyinputsnor valid form-control" aria-required="true" aria-invalid="false">' + selectElement + '</select></div></div>';
            }
            $('#child_age').html(elements);
        });

        $(document).ready(function () {
            $('#tour_date').datepicker({
                dateFormat: 'dd-mm-yy',
                numberOfMonths: 1,
                minDate: 0,
            });
        });

        $(document).on('change', '#pickup_location', function (e) {
            const hcode = $('option:selected', this).attr('hcode');
            const hname = $('option:selected', this).attr('hname');
            $('#hotel_name').val(hname);
            $('#hotel_code').val(hcode);
        });
    }


    addToCart() {
        $('#spin').show();
        const data = $('#tourSubmitForm').serialize();
        this._TourService.addToCartAPI(data).subscribe(result => {
            console.log(result);
            $('#spin').hide();
            if (result.status){
                this.router.navigate(['/booking/'], {
                    queryParams: {
                        id: result.datas.session_id_c
                    }
                });
            }
        }, error1 => {
            console.log(error1.toString());
        });
    }
}

