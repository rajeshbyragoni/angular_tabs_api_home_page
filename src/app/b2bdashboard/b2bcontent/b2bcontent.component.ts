import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NavigationEnd, Router} from '@angular/router';
import {GlobalService} from '../../service/global.service';
import {DashboardService} from '../../service/dashboard.service';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-b2bcontent',
    templateUrl: './b2bcontent.component.html',
    styleUrls: ['./b2bcontent.component.css']
})
export class B2bcontentComponent implements OnInit {

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


    constructor(private router: Router, private _GlobalService: GlobalService, private _DashboardService: DashboardService) {
    }

    ngOnInit() {
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0);
        });
        this.dashboardData();
    }

    dashboardData() {
        this._DashboardService.getUserDashBoard()
            .subscribe(
                result => {
                    localStorage.setItem('email', result.userInfo.user_email_id);
                    this.flightBookingsCnt = result.flight_bookings.cnt;
                    this.hotelBookingsCnt = result.hotel_bookings.cnt;
                    this.tourBookings = result.tour_bookings.cnt;
                    this.transferBookings = result.transfer_bookings.cnt;
                    this.holidayBookings = result.holiday_bookings.cnt;
                });
    }

}
