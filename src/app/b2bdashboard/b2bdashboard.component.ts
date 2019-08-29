import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {DashboardService} from '../service/dashboard.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as myGlobals from '../global';
import {first} from 'rxjs/operators';
import {GlobalService} from '../service/global.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-b2bdashboard',
    templateUrl: './b2bdashboard.component.html',
    styleUrls: ['./b2bdashboard.component.css']
})
export class B2bdashboardComponent implements OnInit {

    flightBookingsCnt = 0;
    hotelBookingsCnt = 0;
    tourBookings = 0;
    transferBookings = 0;
    holidayBookings = 0;
    isCollapsed1 = true;
    isCollapsed2 = true;
    profileForm: FormGroup;
    fileList: FileList;
    fileListLi: FileList;
    file: File;
    fileLi: File;
    licenseName: string;
    profilePhoto: any;
    stateArray: any = [];
    countryArray: any = [];
    currencyArray: any = [];
    emailError: boolean;

    inboxs = [
        {
            sin: '1',
            ticketid: 'ST130810005',
            date: '    Aug 13,2018',
            subject: 'Booking Failure',
            action: 'View Close',
        },
        {
            sin: '2',
            ticketid: 'ST130810005',
            date: 'Aug 13,2018',
            subject: 'Booking Failure',
            action: 'View Close',
        },
        {
            sin: '3',
            ticketid: 'ST130810005',
            date: 'Aug 13,2018',
            subject: 'Booking Failure',
            action: 'View Close',
        },

    ];

    constructor(private router: Router, private fb: FormBuilder, private _GlobalService: GlobalService, private _DashboardService: DashboardService, private _HttpClient: HttpClient) {
        this.createForm();
    }

    createForm() {
        const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
        this.profileForm = this.fb.group({
            AgencyName: ['', Validators.required],
            country: ['', Validators.required],
            city_name: ['', Validators.required],
            address: ['', Validators.required],
            zip_code: ['', Validators.required],
            Fax: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])],
            c_phone: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[6-9]\\d{9}$')])],
            Website: ['', Validators.compose([Validators.required, , Validators.pattern(reg)])],
            contact_no: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[6-9]\\d{9}$')])],
            Email: ['', [Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$'), Validators.required]],
            c_person: ['', Validators.required],
            Surname: ['', Validators.required],
            company: ['', Validators.required],
            currency: ['', Validators.required],
            c_designation: ['', Validators.required],
            Iata: ['', Validators.required],
            profilePhoto: ['', Validators.required],
            licence_number: ['', Validators.required],
            license_picture: ['', Validators.required],

        });
    }

    ngOnInit() {

        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0);
        });
        // this.getCountryList();
        // this.getCurrencyList();
        // this.dashboardData();
    }

    dashboardData() {
        this._DashboardService.getUserDashBoard()
            .subscribe(
                result => {
                    this.flightBookingsCnt = result.flight_bookings.cnt;
                    this.hotelBookingsCnt = result.hotel_bookings.cnt;
                    this.tourBookings = result.tour_bookings.cnt;
                    this.transferBookings = result.transfer_bookings.cnt;
                    this.holidayBookings = result.holiday_bookings.cnt;
                });
    }

    getCountryList() {
        this._GlobalService.getCountry().subscribe(
            result => {
                this.countryArray = result['country'];
            },
            error => {
                console.log(error.toString());
            });
    }

    getCurrencyList() {
        this._GlobalService.getAllCurrency().subscribe(
            result => {
                this.currencyArray = result['currency'];
            },
            error => {
                console.log(error.toString());
            });
    }

    countryChange(value) {
        this._GlobalService.getState(value).subscribe(
            result => {
                this.stateArray = result['city'];
            },
            error => {
                console.log(error.toString());
            });
    }

    profileClick(AgencyName, country, city_name, address, zip_code, Fax, c_phone, Website, contact_no, Email, c_person, Surname, company, currency, c_designation,
                 Iata, profilePhoto, licence_number, license_picture) {
    }

    fileChange(event) {
        this.fileList = event.target.files;
        if (this.fileList.length > 0) {
            this.file = this.fileList[0];
        }

        const file = event.target['files'][0];
        this.profilePhoto = file.name;
    }

    fileChangeLiesense(event) {
        this.fileListLi = event.target.files;
        if (this.fileListLi.length > 0) {
            this.fileLi = this.fileListLi[0];
        }

        const file = event.target['files'][0];
        this.licenseName = file.name;
    }


}
