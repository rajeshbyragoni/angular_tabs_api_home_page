import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {first, catchError, map} from 'rxjs/operators';
import {CommonService} from '../service/common.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, throwError} from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    isCollapsed = false;
    login = false;
    firstName = '';
    profilePic = '';
    forgot = false;
    registers = false;
    isLogin = '';
    countrydata: any = [];
    selectedCountrys = {
        countryname: 'ENG',
        src: 'assets/img/flags/32/uk.png',
    };
    currencydata: any = [];
    selectedCurrencys = {
        currencyname: 'EUR',
        cdcode: '€',
    };
    LoginForm: FormGroup;

    constructor(private _CommonService: CommonService, private fb: FormBuilder) {
        this.createForm();
    }

    createForm() {
        this.LoginForm = this.fb.group({
            username: ['', [Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$'), Validators.required]],
            password: ['', [Validators.minLength(6), Validators.required]]
        });
    }

    ngOnInit() {
        this.firstName = localStorage.getItem('fname');
        this.isLogin = localStorage.getItem('isLoggedIn');
        this.profilePic = localStorage.getItem('profile_photo');
        this._CommonService.getSiteLanguages().pipe(first())
            .subscribe(
                countrydata => {
                    this.countrydata = countrydata;
                });
        this._CommonService.getSiteCurrency().pipe(first())
            .subscribe(
                currencydata => {
                    this.currencydata = currencydata;
                });
    }

    toggleLogin() {
        this.login = true;
        this.registers = false;
        this.forgot = false;
    }

    toggleForgot() {
        this.login = false;
        this.registers = false;
        this.forgot = true;
    }

    toggleRegister() {
        this.login = false;
        this.registers = true;
        this.forgot = false;
    }

    onSelectCountry(country: any): void {
        this.selectedCountrys = country;
    }

    onSelectCurrency(currency: any): void {
        this.selectedCurrencys = currency;
    }

    doLogin(username, password) {
        if (username !== '' && password !== '') {
            this._CommonService.b2cLogin(username, password).subscribe(
                result => {
                    if (result.status) {
                        window.location.href = '';
                    }
                },
                error => {
                    console.log(error);
                }
            );
        }
    }


}
