import {Component, OnInit} from '@angular/core';
import {FinanReportService} from '../../service/finan-report.service';

@Component({
    selector: 'app-financilreporting',
    templateUrl: './financilreporting.component.html',
    styleUrls: ['./financilreporting.component.css']
})
export class FinancilreportingComponent implements OnInit {

    isCollapsed2 = true;
    reportData: any;

    constructor(private _FinanReportSer: FinanReportService) {
    }

    ngOnInit() {
        this.getData();
    }

    getData() {
        this._FinanReportSer.getFinaState().subscribe(
            results => {
                this.reportData = results.orders;
                console.log(results.orders);
            }, error => {
                console.log(error.toString());
            }
        );
    }

}
