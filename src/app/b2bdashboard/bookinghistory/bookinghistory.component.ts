import {Component, OnInit} from '@angular/core';
import {BookinghistoryService} from '../../service/bookinghistory.service';

@Component({
    selector: 'app-bookinghistory',
    templateUrl: './bookinghistory.component.html',
    styleUrls: ['./bookinghistory.component.css']
})
export class BookinghistoryComponent implements OnInit {

    bookHistory: any;
     isCollapsed1 = true;
    constructor(private _BookinghistoryService: BookinghistoryService) {
    }

    ngOnInit() {
        this._BookinghistoryService.getHistoryList().subscribe(result => {
            console.log(result.data.getoverallBookings);
            this.bookHistory = result.data.getoverallBookings;
        });
    }

}
