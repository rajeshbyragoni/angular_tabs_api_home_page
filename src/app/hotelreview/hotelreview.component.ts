import {Component, OnInit} from '@angular/core';
import {CommonService} from '../service/common.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
declare var $: any;

@Component({
    selector: 'app-hotelreview',
    templateUrl: './hotelreview.component.html',
    styleUrls: ['./hotelreview.component.css']
})
export class HotelreviewComponent implements OnInit {

    emailID: object;
    phoneCode: any;
    token: any;
    ip: any;
    country: string;
    city: string;
    currency: string;
    isHide = false;
    successMessage: object;
    secdata: object;
    product_name: string;
    cart: any = [];
    resData: any = [];

    constructor(private _CommonService: CommonService, private route: ActivatedRoute, private router: Router, private http: HttpClient) {}

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.token = params['id'];
            this.bookRW(params['id']);
        });
        this.btnClickPswd();
        this.getMyLocation();
        this.validateNumber();
    }

    bookRW(token) {
        this._CommonService.hoteReview(token).subscribe(
            results => {
                this.product_name = results.book_temp_data[0].product_name;
                if (results.status && this.product_name === 'HOTEL') {
                    this.resData = results;
                    this.cart = results.cart;
                    this.emailID = results.userInfo.user_email;
                    this.phoneCode = results.phone_code;
                } else if (results.status && this.product_name === 'TOUR') {
                    this.cart = results.cart;
                    this.resData = results;
                    this.emailID = results.userInfo.user_email;
                    this.phoneCode = results.phone_code;
                }
            }, error => {
                console.log(error.toString());
            }
        );
    }

    getMyLocation() {
        this.http.get('https://ipapi.co/json/').subscribe(
            results => {
                this.ip = results['ip'];
                this.country = results['country'];
                this.city = results['city'];
                this.currency = results['currency'];
            }
        );
    }

    ContinueBTN() {
        // $(document).ready(function(){
        const email = $('#emailID').val();
        const datas = $('#ihave').val($(this).is(':checked'));
        if ($('#ihave').is(':checked')) {
            const paswd = $('#pswd').val();
            if (email && paswd) {
                this._CommonService.accountLogin('B2B', email, paswd, this.token, this.ip, this.country, this.city,
                    this.currency).subscribe(
                    results => {
                        if (results.status) {
                            localStorage.setItem('token', results.token);
                            this.isHide = true;
                            this.successMessage = results.response.msg;
                            this.secdata = results.api_data.secdata;
                            $('#Continue').hide();
                            $('.todal').hide();
                        }
                    });
            } else {
                $('#error').fadeTo(2000, 500).slideUp(500, function () {
                    $('#error').slideUp(500);
                });
            }
        } else {
            const phoneCode = $('#phoneCode').val();
            const mobileNo = $('#mobileNo').val();
            if (phoneCode && mobileNo && email) {
                this._CommonService.createWithEmail('GUEST', email, this.token, mobileNo, phoneCode).subscribe(
                    results => {
                        if (results.status) {
                            localStorage.setItem('token', results.token);
                            this.isHide = true;
                            this.successMessage = results.user_logs_status;
                            this.secdata = results.secdata;
                            $('#Continue').hide();
                            $('.todal').hide();
                        }
                    });
                ;
            } else {
                $('#error').fadeTo(2000, 500).slideUp(500, function () {
                    $('#error').slideUp(500);
                });
            }
        }
        // });
    }

    btnClickPswd() {
        $(document).ready(function () {
            $('input#ihave[type="checkbox"]').on('change', function () {
                const datas = $('#ihave').val($(this).is(':checked'));
                if (datas.val() === 'false') {
                    $('#emailID').removeAttr('readonly');
                    $('#mobileNo').attr('required', true);
                    $('#phoneCode').attr('required', true);
                    $('#pswdent').fadeOut(500, function () {
                        $('#cdm').fadeIn(500);
                    });
                } else {
                    $('#pswd').attr('required', true);
                    $('#emailID').prop('readonly', true);
                    $('#cdm').fadeOut(500, function () {
                        $('#pswdent').fadeIn(500);
                    });
                }
            });
        });
    }

    promoCode(promo) {
        // this._CommonService.promCoDeApi(promo, total, cid).subscribe( result => {
        //     console.log(result);
        // }, error => {
        //     console.log(error.toString());
        // });
    }

    successLogin() {
        this.router.navigate(['/bookingraveller/'], {
            queryParams: {
                secdata: this.secdata
            }
        });
    }

    validateNumber() {
        $('#mobileNo').keypress(function (e) {
            if (e.keyCode > 47 && e.keyCode < 58) {
                return true;
            } else {
                return false;
            }
        });
    };
}
