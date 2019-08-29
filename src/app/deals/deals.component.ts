import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';
import {HomeService} from '../service/home.service';

@Component({
    selector: 'app-deals',
    templateUrl: './deals.component.html',
    styleUrls: ['./deals.component.css']
})
export class DealsComponent implements OnInit {

    trendyDeals: any = [];
    topDeals: any = [];
    specialDeals: any = [];
    topDestinations: any = [];
    bestPackages: any = [];

    constructor(private _HomeService: HomeService) {
    }

    ngOnInit() {
        this._HomeService.getTrendyDeals().pipe(first())
            .subscribe(
                trendyDeals => {
                    this.trendyDeals = trendyDeals;
                });
        this._HomeService.getTopDeals().pipe(first())
            .subscribe(
                topDeals => {
                    this.topDeals = topDeals;
                });
        this._HomeService.getSpecialDeals().pipe(first())
            .subscribe(
                specialDeals => {
                    this.specialDeals = specialDeals;
                });

        this._HomeService.getTopDestinations().pipe(first())
            .subscribe(
                topDestinations => {
                    this.topDestinations = topDestinations;
                });
        this._HomeService.getBestPackages().pipe(first())
            .subscribe(
                bestPackages => {
                    this.bestPackages = bestPackages;
                });

    }
}




