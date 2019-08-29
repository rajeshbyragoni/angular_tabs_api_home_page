import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'titleCaseWord'})
export class TextPipe implements PipeTransform {

    transform(input: string): any {
        if (!input) {
            return input;
        }

        if (input.indexOf(' ') !== -1) {
            let inputPieces;
            input = input.toLowerCase();
            inputPieces = input.split(' ');

            for (let i = 0; i < inputPieces.length; i++) {
                inputPieces[i] = capitalizeString(inputPieces[i]);
            }

            return inputPieces.toString().replace(/,/g, ' ');
        } else {
            input = input.toLowerCase();
            return capitalizeString(input);
        }

        function capitalizeString(inputString) {
            return inputString.substring(0, 1).toUpperCase() + inputString.substring(1);
        }
    }

}

@Pipe({
    name: 'range',
    pure: false
})
export class RangePipe implements PipeTransform {    
    transform(items: any[], quantity: number): any {
        items.length = 0;
        for (let i = 0; i < quantity; i++) {
            items.push(i);
        }
        return items;
    }
}

@Pipe({
    name: 'rangeOne',
    pure: false
})
export class RangeOnePipe implements PipeTransform {
    transform(items: any[], quantity: number): any {
        items.length = 0;
        for (let i = 0; i < 5 - quantity; i++) {
            items.push(i);
        }
        return items;
    }
}

@Pipe({name: 'dateSuffix'})
export class DateSuffix implements PipeTransform {
    transform(value: string): string {
        let suffix = 'th';
        const day = value;

        if (day === '1' || day === '21' || day === '31') {
            suffix = 'st';
        } else if (day === '2' || day === '22') {
            suffix = 'nd';
        } else if (day === '3' || day === '23') {
            suffix = 'rd';
        }

        return suffix;

    }
}

@Pipe({name: 'demoNumber'})
export class DemoNumber implements PipeTransform {
    transform(value, args: string[]): any {
        const res = [];
        for (let i = 0; i < value; i++) {
            res.push(i);
        }
        return res;
    }
}

@Pipe({name: 'grdFilter'})
export class GrdFilterPipe implements PipeTransform {
    transform(items: any, filter: any, defaultFilter: boolean): any {
        if (!filter) {
            return items;
        }

        if (!Array.isArray(items)) {
            return items;
        }
        let aa = '1';
        let bb = '2';
        let cc = '3';
        let dd = '4';
        let ee = '5';
        if (filter.star_rating.length === 1) {
            aa = filter.star_rating;
            bb = '';
            cc = '';
            dd = '';
            ee = '';
        } else if (filter.star_rating.length === 0) {
            aa = '1';
            bb = '2';
            cc = '3';
            dd = '4';
            ee = '5';
        } else if (filter.star_rating.length === 3) {
            aa = filter.star_rating[0];
            bb = filter.star_rating[2];
            cc = '';
            dd = '';
            ee = '';
        } else if (filter.star_rating.length === 5) {
            aa = filter.star_rating[0];
            bb = filter.star_rating[2];
            cc = filter.star_rating[4];
            dd = '';
            ee = '';
        } else if (filter.star_rating.length === 7) {
            aa = filter.star_rating[0];
            bb = filter.star_rating[2];
            cc = filter.star_rating[4];
            dd = filter.star_rating[6];
            ee = '';
        } else if (filter.star_rating.length === 9) {
            aa = filter.star_rating[0];
            bb = filter.star_rating[2];
            cc = filter.star_rating[4];
            dd = filter.star_rating[6];
            ee = filter.star_rating[8];
        }

        if (filter && Array.isArray(items)) {
            const filterKeys = Object.keys(filter);
            if (defaultFilter) {
                return items.filter(item =>
                    filterKeys.reduce((x, keyName) =>
                        (x && new RegExp(filter[keyName], 'gi').test(item[keyName])) || filter[keyName] === '', true));
            } else {
                return items.filter(item => {
                    return filterKeys.some((keyName) => {
                        return ((item.amount <= +filter.max && item.amount >= +filter.min) && (item.star_rating === aa ||
                            item.star_rating === bb || item.star_rating === cc || item.star_rating === dd || item.star_rating === ee));
                    });
                });

                return items.filter(function (item) {

                });
            }
        }
    }
}

@Pipe({name: 'numPipe'})
export class numPipe implements PipeTransform {
    transform(x: string): number { //string type
        const y = +x;
        return y;
    }
}

@Pipe({name: 'mathRound'})
export class mathRound implements PipeTransform {
    transform(x): number { //string type
        return Math.round(x);
    }
}
