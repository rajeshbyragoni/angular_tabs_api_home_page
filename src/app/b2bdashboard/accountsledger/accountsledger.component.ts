import {Component, OnInit} from '@angular/core';
import {AccountsledgerService} from '../../service/accountsledger.service';

@Component({
    selector: 'app-accountsledger',
    templateUrl: './accountsledger.component.html',
    styleUrls: ['./accountsledger.component.css']
})
export class AccountsledgerComponent implements OnInit {

    actSteMntData: any;
    constructor(public _AccountsledgerService: AccountsledgerService) {
    }

    ngOnInit() {
        this.getAccountStateMent();
    }

    getAccountStateMent() {
        this._AccountsledgerService.getStatementList().subscribe(results => {
            console.log('data');
            this.actSteMntData = results.data.account_statment_data ;
        });
    }


}
