import {Component, OnInit} from '@angular/core';
import {NewsletterService} from '../../service/newsletter.service';

@Component({
    selector: 'app-newsletter',
    templateUrl: './newsletter.component.html',
    styleUrls: ['./newsletter.component.css']
})
export class NewsletterComponent implements OnInit {

    checkBox: any;

    constructor(private  _NewsletterService: NewsletterService) {
    }

    ngOnInit() {
        this.updateNotifi();
    }

    updateNotifi() {
        this._NewsletterService.getNewsLater().subscribe(results => {
            this.checkBox = results.data.getNewsletterStatus;
        });
    }

    updateNotify(status) {
        this._NewsletterService.updateNewsLatter(status).subscribe(
            results => {
                this.ngOnInit();
            },
            error => {
                console.log(error.toString());
            }
        );
    }


}

