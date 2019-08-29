import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {first} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CommonService} from '../../service/common.service';
import {throwError} from 'rxjs';
import {AuthService} from '../../_guards/auth.service';

declare var $: any;

@Component({
    selector: 'app-user-login',
    templateUrl: './user-login.component.html',
    styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

    loginForm: FormGroup;
    error: string;
    submitted = false;
    data: any = {};
    ip: any;
    country: string;
    city: string;
    currency: string;
    loading = false;
    message: string;
    returnUrl: string;

    constructor(private _CommonService: CommonService, private fb: FormBuilder, private router: Router, private http: HttpClient,
                private authService: AuthService) {
    }

    ngOnInit() {
        $('#carouselFade').carousel();
        this.loginForm = this.fb.group({
            email: ['', [Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$'), Validators.required]],
            password: ['', [Validators.required, Validators.minLength(6)]],
        });
        this.getMyLocation();
        this.returnUrl = '/home';
        if (localStorage.getItem('isLoggedIn') === 'true') {
            this.router.navigate([this.returnUrl]);
        } else {
            this.authService.logout();
        }
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

    Login() {
        this.submitted = true;
        if (this.loginForm.invalid) {
            return;
        }
        const email = this.loginForm.value.email;
        const password = this.loginForm.value.password;
        const currency = this.currency;
        const country = this.country;
        const city = this.city;
        this._CommonService.login('B2B', email, password, this.ip, country, city, currency).subscribe(
                data => {
                    if (data['status']) {
                        // Local Store
                        localStorage.setItem('rid', data.response.rid);
                        localStorage.setItem('fname', data.response.fname);
                        localStorage.setItem('profile_photo', data.response.profile_photo);
                        localStorage.setItem('token', data.response.token);
                        localStorage.setItem('isLoggedIn', 'true');
                        this.router.navigate([this.returnUrl]);
                    } else {
                        this.loginForm.controls['email'].setErrors({'already': true});
                        this.loginForm.controls['password'].setErrors({'already': true});
                        this.error = data.msg;
                        this.loading = false;
                    }
                },
                error => {
                    this.loading = false;
                    return throwError(this.error);
                }
            );
    }


}
