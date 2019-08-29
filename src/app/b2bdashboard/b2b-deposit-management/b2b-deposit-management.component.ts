import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {GlobalService} from '../../service/global.service';
import {B2bDepositManagementService} from '../../service/b2b-deposit-management.service';
import {HttpClient} from '@angular/common/http';

declare var $: any;

@Component({
    selector: 'app-b2b-deposit-management',
    templateUrl: './b2b-deposit-management.component.html',
    styleUrls: ['./b2b-deposit-management.component.css']
})
export class B2bDepositManagementComponent implements OnInit {

    isCollapsed2 = true;
    deposit: any;
    depositForm: FormGroup;
    userfile: any;
    currencyArray: any = [];
    emailError: boolean;
    profileName: string;
    file: File;
    fileList: FileList;
    submitted = false;

    constructor(private fb: FormBuilder, private router: Router, private _GlobalService: GlobalService, private _DepositService: B2bDepositManagementService) {
        this.depositCreateForm();
    }

    depositCreateForm() {
        this.depositForm = this.fb.group({
            banking_type: ['', Validators.required],
            check_number: ['', Validators.required],
            bank_name: ['', Validators.required],
            bank_branch: ['', Validators.required],
            bank_city: ['', Validators.required],
            amount: ['', Validators.required],
            currency: ['', Validators.required],
            bank_date: ['', Validators.required],
            remarks: ['', Validators.required],
            userfile: ['', Validators.required],

        });
    }

    ngOnInit() {
        this.depositData();
        this.getCurrencyList();
        this.depositForm.get('currency').setValue('USD');

        $(document).ready(function () {
            $(document).on('change', '.banking_type', function () {
                if ($(this).val() === 'banking') {
                    $('.banking_fields').slideDown();
                    $('.cheque_fields').slideUp();
                    $('.banking_types').val('banking');
                } else if ($(this).val() === 'cheque') {
                    $('.banking_fields').slideUp();
                    $('.cheque_fields').slideDown();
                    $('.banking_types').val('cheque');
                } else if ($(this).val() === 'letter_of_credit') {
                    $('.banking_fields').slideUp();
                    $('.cheque_fields').slideUp();
                    $('.banking_types').val('letter_of_credit');
                } else {
                    $('.banking_fields').slideUp();
                    $('.cheque_fields').slideUp();
                    $('.banking_types').val('credit');
                }
            });
        });
    }

    getCurrencyList() {
        this._GlobalService.getAllCurrency().subscribe(
            result => {
                this.currencyArray = result['currency'];
            },
            error => {
                console.log(error.toString());
            });

    }

    fileChange(event) {
        this.fileList = event.target.files;
        if (this.fileList.length > 0) {
            this.file = this.fileList[0];
        }

        const file = event.target['files'][0];
        this.profileName = file.name;
    }

    depositData() {
        this._DepositService.getDepositList()
            .subscribe(
                result => {
                    this.deposit = result.data.deposit_amount;
                });
    }

    depositClick(banking_type, check_number, bank_name, bank_branch, bank_city, amount, currency, bank_date, remarks, banking) {
        console.log();
        this._DepositService.addDeposit(banking_type, check_number, bank_name, bank_branch, bank_city, amount, currency, bank_date, remarks, this.file, banking).subscribe(
            result => {
                if (result.status === 1) {
                    this.depositForm.reset();
                    this.router.navigate(['/b2bdashboard']);
                }
            }, error => {
                console.log(error);
            }
        );

    }


}
