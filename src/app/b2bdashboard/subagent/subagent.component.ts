import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {GlobalService} from '../../service/global.service';
import {SubagentService} from '../../service/subagent.service';
import {HttpClient} from '@angular/common/http';

declare var $: any;

@Component({
    selector: 'app-subagent',
    templateUrl: './subagent.component.html',
    styleUrls: ['./subagent.component.css']
})
export class SubagentComponent implements OnInit {
    isCollapsed2 = true;
    subagentForm: FormGroup;
    countryArray: any = [];
    currencyArray: any = [];
    stateArray: any = [];
    fileList: FileList;
    fileListLi: FileList;
    file: File;
    fileLi: File;
    o_pin: any;
    profileName: string;
    profile_picture: any;
    license_picture: any;
    licenseName: string;
    emailError: boolean;
    subdata: any;

    constructor(private fb: FormBuilder, private router: Router, private _GlobalService: GlobalService,
                private _SubagentService: SubagentService) {
        this.subagentCreateForm();
    }


    subagentCreateForm() {
        this.subagentForm = this.fb.group({
            company: ['', Validators.required],
            iata: ['', Validators.required],
            no_branch: ['', Validators.required],
            c_person: ['', Validators.required],
            c_designation: ['', Validators.required],
            c_email: ['', [Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$'), Validators.required]],
            c_phone: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[6-9]\\d{9}$')])],
            o_address: ['', Validators.required],
            o_city: ['', Validators.required],
            // country: ['', Validators.required],
            o_pin: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])],
            contact_no: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[6-9]\\d{9}$')])],
            email: ['', [Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$'), Validators.required]],
            pswd: ['', [Validators.minLength(5), Validators.maxLength(15), Validators.required]],
            profile_picture: ['', Validators.required],
            licence_number: ['', Validators.required],
            license_picture: ['', Validators.required],
            currency_code: ['', Validators.required],
        });
    }

    ngOnInit() {
        this.getCountryList();
        this.getCurrencyList();
        this.subAgentData();
    }

    getCountryList() {
        this._GlobalService.getCountry().subscribe(
            result => {
                this.countryArray = result['country'];
            },
            error => {
                console.log(error.toString());
            });
    }

    countryChange(value) {
        this._GlobalService.getState(value).subscribe(
            result => {
                this.stateArray = result['city'];
            },
            error => {
                console.log(error.toString());
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

    fileChangeLiesense(event) {
        this.fileListLi = event.target.files;
        if (this.fileListLi.length > 0) {
            this.fileLi = this.fileListLi[0];
        }

        const file = event.target['files'][0];
        this.licenseName = file.name;
    }

    subAgentData() {
        this._SubagentService.getSubAgentList()
            .subscribe(
                result => {
                    console.log(result.subagent);
                    this.subdata = result.subagent;
                });
    }

    activeClick(id) {
        this._SubagentService.getSubAgentActive(id)
            .subscribe(
                result => {
                    this.router.navigate(['/subagent']);
                    this.ngOnInit();
                });
    }

    inActiveClick(id) {
        this._SubagentService.getSubAgentInactive(id)
            .subscribe(
                result => {
                    if(result.status) {
                        this.router.navigate(['/subagent']);
                        this.ngOnInit();
                    }
                });
    }

    subagentClick(company, iata, no_branch, c_person, c_designation, c_email, c_phone, o_address, o_city, o_pin, contact_no, email, pswd,
                  licence_number, currency_code) {

        // console.log('company', company);
        // console.log('iata', iata);
        //
        // console.log('no_branch', no_branch);
        //
        // console.log('c_person', c_person);
        //
        // console.log('c_designation', c_designation);
        //
        // console.log('c_email', c_email);
        //
        // console.log('c_phone', c_phone);
        //
        // console.log('o_address', o_address);
        //
        // console.log('o_city', o_city);
        // // console.log('country', country);
        //
        // console.log('o_pin', o_pin);
        //
        // console.log('contact_no', contact_no);
        //
        // console.log('email', email);
        //
        // console.log('pswd', pswd);
        // console.log('licence_number', licence_number);
        // console.log('currency_code', this.subagentForm.get('currency_code').value);


        this._SubagentService.subUser(company, iata, no_branch, c_person, c_designation, c_email, c_phone, o_address, o_city, '', o_pin, contact_no, email, pswd, this.file, this.fileLi,
            licence_number, this.subagentForm.get('currency_code').value).subscribe(
            result => {
                //console.log('selva' + result);
                if (result.success === 'false') {
                    // console.log('ddhdhd');
                    this.emailError = true;
                }
            }, error => {
                // console.log(error);
            }
        );

    }


}
