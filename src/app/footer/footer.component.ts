import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HomeService} from '../service/home.service';
import {first} from 'rxjs/operators';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

    SubscribeForm: FormGroup;
    SuscribeMsg: any = [];
    socialpagelink: any = [];

    constructor(private fb: FormBuilder, private router: Router, private _HomeService: HomeService) {
        this.createForm();
    }

    createForm() {
        this.SubscribeForm = this.fb.group({
            email: ['', [Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$'), Validators.required]]
        });
    }

    ngOnInit() {
        this.getSocialPageLink();
    }

    Subscribe(email) {
        if (email !== '') {
            this._HomeService.doSubscribe(email).subscribe(
                result => {
                    this.SuscribeMsg = result;
                },
                error => {
                    console.log(error);
                }
                );
        }
    }

    getSocialPageLink() {
        this._HomeService.getSocialPageLink().subscribe(
            result => {
                this.socialpagelink = result;
            });
    }


}
