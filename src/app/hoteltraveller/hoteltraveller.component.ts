import {Component, NgZone, OnInit} from '@angular/core';
import {CommonService} from '../service/common.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import * as myGlobals from '../global';

declare var $: any;

@Component({
    selector: 'app-hoteltraveller',
    templateUrl: './hoteltraveller.component.html',
    styleUrls: ['./hoteltraveller.component.css']
})
export class HoteltravellerComponent implements OnInit {

    demoNumber = 5;
    counter = Array;
    rooms: any;
    child: any;
    adult: any;
    cid: string;
    cids: string;
    countryList: any;
    secdata: any;
    total: string;
    code: string;
    Totall: any;
    product_name: string;
    resData: any = [];
    cart: any = [];

    constructor(private _CommonService: CommonService, private route: ActivatedRoute, private router: Router, private zone: NgZone) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.secdata = params['secdata'];
            this.fetchData(params['secdata']);
        });
        this.code = window.btoa('X3C942H0I1');
        this.paymentShow();
        this.validateNumber();
    }

    fetchData(secdata) {
        this._CommonService.bookingTraveller(secdata).subscribe(results => {
            this.product_name = results.book_temp_data[0].product_name;
            if (results.status && this.product_name === 'HOTEL') {
                this.cids = results.cart_global_cc;
                this.cid = results.cid;
                this.rooms = results.rooms;
                this.child = results.child;
                this.adult = results.adult;
                console.log(results);
                this.countryList = results.countries;
                this.Totall = results.Totall;
                this.total = window.btoa(results.Totall);
            } else if (results.status && this.product_name === 'TOUR') {
                this.cart = results.cart;
                this.cids = results.cart_global_cc;
                this.resData = results;
                this.cid = results.cid;
                this.countryList = results.countries;
                this.Totall = results.cart.total_cost;
                this.total = window.btoa(results.Totall);
            }
        });
    }

    clickContinue() {

        // $(document).on('click', '.clickContinue', function () {
        $('.error').remove();
        let first_name = false;
        let payment = false;
        let last_name = false;
        let email_address = false;
        let country_id = false;
        let phone_number = false;
        let emailID = false;
        let addressD = false;
        let nationalityD = false;

        if (this.product_name === 'TOUR') {
            $('.emailC').each(function () {
                const emailD = $(this).val();
                if (emailD.length < 1) {
                    $(this).after('<span class="error tol">This field is required</span>');
                } else {
                    emailID = true;
                    $(this).after('<span></span>');
                }
            });
            $('.addressC').each(function () {
                const addressC = $(this).val();
                if (addressC.length < 1) {
                    $(this).after('<span class="error tol">This field is required</span>');
                } else {
                    addressD = true;
                    $(this).after('<span></span>');
                }
            });
            $('.nationalityC').each(function () {
                const nationalityC = $(this).val();
                if (nationalityC.length < 1) {
                    $(this).after('<span class="error tol">This field is required</span>');
                } else {
                    nationalityD = true;
                    $(this).after('<span></span>');
                }
            });
        }

        $('.firstName').each(function () {
            const firstName = $(this).val();
            if (firstName.length < 1) {
                $(this).after('<span class="error tol">This field is required</span>');
            } else {
                first_name = true;
                $(this).after('<span></span>');
            }
        });
        const nck = $('input:radio[name=payment_method]:checked').val();
        if (nck === undefined) {
            $('.errorPay').show();
        } else {
            payment = true;
            $('.errorPay').hide();
        }
        $('.lastName').each(function () {
            const lastName = $(this).val();
            if (lastName.length < 1) {
                $(this).after('<span class="error tol">This field is required</span>');
            } else {
                last_name = true;
                $(this).after('<span></span>');
            }
        });

        const emailAddress = $('.emailAddress').val();
        if (emailAddress.length < 1) {
            $('.emailAddress').after('<span class="error tol">This field is required</span>');
        } else {
            email_address = true;
            $('.emailAddress').after('<span></span>');
        }
        const countryD = $('.countryD').val();
        if (countryD.length < 1) {
            $('.countryD').after('<span class="error tol">This field is required</span>');
        } else {
            country_id = true;
            $('.countryD').after('<span></span>');
        }
        const phoneNumber = $('.phoneNumber').val();
        if (phoneNumber.length < 1) {
            $('.phoneNumber').after('<span class="error tol">This field is required</span>');
        } else {
            phone_number = true;
            $('.phoneNumber').after('<span></span>');
        }
        if (first_name && payment && last_name && email_address && country_id && phone_number) {
            if (nck === 'PaymentGateway') {
                console.log(nck);
            } else {
                const formData = $('#TravellerForm').serialize();
                this._CommonService.checkOutAPI(formData).subscribe(results => {
                    if (results.flag) {
                        this._CommonService.bookAPI(results.parent_pnr).subscribe( dataRes => {
                            if (dataRes.status) {
                                this.router.navigate(['/successpayment/'], {
                                    queryParams: {
                                        id: results.parent_pnr
                                    }
                                });
                            }
                        }, error => {
                            console.log(error.toString());
                        });
                    }
                });
            }
        }
    }

    paymentShow() {
        $(document).ready(function () {
            $('input[name$=\'payment_method\']').click(function () {
                const value = $(this).val();
                if (value === 'DEPOSIT') {
                    $('#cardDetails').hide();
                }
                if (value === 'PaymentGateway') {
                    $('#cardDetails').show();
                }
            });
        });
    }

    numberReturn(length) {
        return new Array(length);
    }

    validateNumber() {
        $('.numberOnly').keypress(function (e) {
            if (e.keyCode > 47 && e.keyCode < 58) {
                return true;
            } else {
                return false;
            }
        });
    };

}
