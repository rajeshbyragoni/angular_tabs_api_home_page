import {Component, OnInit} from '@angular/core';
import {CommonService} from '../service/common.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-successpayment',
    templateUrl: './successpayment.component.html',
    styleUrls: ['./successpayment.component.css']
})
export class SuccesspaymentComponent implements OnInit {

    constructor(private _CommonService: CommonService, private router: Router, private route: ActivatedRoute) {
    }
    parent_pnr_no: string;
    hotel_name: any;
    checkin: any;
    checkout: any;
    amount: any;
    user_name: any;
    user_email: any;
    product_name: string;
    resData: any = [];

    ngOnInit() {
        this.route.queryParams.subscribe( params => {
            this.dataLoad(params['id']);
        });
    }

    dataLoad(parent_pnr) {
        this._CommonService.bookingConfirm(parent_pnr).subscribe( results => {
            this.product_name = results.product_name;
            if (results.status && results.product_name === 'HOTEL') {
                this.parent_pnr_no = results.parent_pnr_no;
                this.hotel_name = results.hotel_name;
                this.checkin = results.checkin;
                this.checkout = results.checkout;
                this.amount = results.amount;
                this.user_name = results.user_name;
                this.user_email = results.user_email;
            } else if(results.status && results.product_name === 'TOUR') {
                this.resData = results.data;
                this.amount = results.amount;
            }
        }, error => {
            console.log(error.toString());
        });
    }
}
