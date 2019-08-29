import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {SupportConvService} from '../../service/support-conv.service';

@Component({
    selector: 'app-supportticket',
    templateUrl: './supportticket.component.html',
    styleUrls: ['./supportticket.component.css']
})
export class SupportticketComponent implements OnInit {

    email = '';
    suportForm: FormGroup;
    disableBtn = true;
    isValidFormSubmitted = false;
    fileList: FileList;
    file: File;
    fileName: '';
    support_ticket_subject: any;
    support: any;
    support_pending: any;
    support_sent: any;
    support_close: any;
    showMsg = ''

    constructor(private fb: FormBuilder, private router: Router, private _SupportConvService: SupportConvService) {
        this.sptTicktForm();
    }

    ngOnInit() {
        this.getData();
    }

    sptTicktForm() {
        this.suportForm = this.fb.group({
            subject: ['', Validators.required],
            file_name: ['', Validators.required],
            message: ['', Validators.required],
        });
    }

    getData() {
        this._SupportConvService.getSupConv().subscribe(
            results => {
                if(results.status) {
                    this.support_ticket_subject = results.support_ticket_subject;
                    this.support = results.support;
                    this.support_pending = results.support_pending;
                    this.support_sent = results.support_sent;
                    this.support_close = results.support_close;
                }
            }, error => {
                console.log(error.toString());
            });
    }

    fileChange(event) {
        this.fileList = event.target.files;
        if (this.fileList.length > 0) {
            this.file = this.fileList[0];
        }

        const file = event.target['files'][0];
        this.fileName = file.name;
    }

    suportFormSubmit(subject, message) {
        this._SupportConvService.newTicket(subject, this.file, message ).subscribe(
            results => {
                if(results.status) {
                    this.showMsg = 'true';
                    setTimeout(() => {
                        this.suportForm.reset();
                        this.showMsg = '';
                        this.ngOnInit();
                    }, 2000);
                } else {
                    this.showMsg = 'false';
                }
            }, error => {
                console.log(error.toString());
            }
        );
    }
}
