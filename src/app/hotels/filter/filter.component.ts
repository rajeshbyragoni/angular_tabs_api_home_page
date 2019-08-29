import {Component, OnInit} from '@angular/core';
import {Options} from 'ng5-slider';
import * as $ from 'jquery';
import {MessageService} from '../../service/message.service';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

    marked = false;
    theCheckbox = false;
    minValue = 20;
    maxValue = 80;
    options: Options = {
        floor: 0,
        ceil: 100,
        step: 5
    };
    startArray: any = [];
    facilityArray: any = [];

    constructor(private _messageService: MessageService) {
    }

    clickFilter(id): void {
        this._messageService.filter(id);
    }

    ngOnInit() {
        $(document).ready(function () {
            $('.ng5-slider-bubble').css('color', '#FFFFFF');
            // $('.ng5-slider-pointer').css('width', '26px');
            // $('.ng5-slider-pointer').css('height', '26px');
            // $('.ng5-slider-pointer').after(function () {
                //     $('.ng5-slider-pointer').css('top', '10px');
                //     $('.ng5-slider-pointer').css('left', '11px');
                // });
            });
    }

    toggleVisibility(e, val) {
        this.marked = e.target.checked;
        const index = this.startArray.indexOf(val);
        if (this.startArray.includes(val)) {
            this.startArray.splice(index, 1);
        } else {
            this.startArray.push(val);
        }
        this._messageService.filter(this.startArray);
    }

    facilityToggle(e, val) {
        this.marked = e.target.checked;
        const index = this.facilityArray.indexOf(val);
        if (this.facilityArray.includes(val)) {
            this.facilityArray.splice(index, 1);
        } else {
            this.facilityArray.push(val);
        }
        this._messageService.facilityFilter(this.facilityArray);
    }
}
