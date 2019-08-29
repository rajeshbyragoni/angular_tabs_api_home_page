import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import {GlobalService} from '../../service/global.service';
import {UserRegisterService} from './user-register.service';
declare var $: any;

@Component({
    selector: 'app-user-register',
    templateUrl: './user-register.component.html',
    styleUrls: ['./user-register.component.css']
})

export class UserRegisterComponent implements OnInit {

    registerForm: FormGroup;
    isValidFormSubmitted = null;
    fileList: FileList;
    fileListLi: FileList;
    file: File;
    fileLi: File;
    profile_picture: any;
    countryArray: any = [];
    stateArray: any = [];
    currencyArray: any = [];
    profileName: string;
    licenseName: string;
    paswd: any;
    emailError: boolean;

    constructor(private fb: FormBuilder, private router: Router, private _GlobalService: GlobalService,
                private _UserRegisterServive: UserRegisterService) {
        this.createForm();
    }

    createForm() {
        const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
        this.registerForm = this.fb.group({
            agencyName: ['', Validators.required],
            country: ['', Validators.required],
            c_phone: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[6-9]\\d{9}$')])],
            Website: ['', Validators.compose([Validators.required, , Validators.pattern(reg)])],
            c_person: ['', Validators.required],
            company: ['', Validators.required],
            city: ['', Validators.required],
            contact_no: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[6-9]\\d{9}$')])],
            Surname: ['', Validators.required],
            profile_picture: ['', Validators.required],
            currency: ['', Validators.required],
            o_pin: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])],
            Fax: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])],
            c_designation: ['', Validators.required],
            Email: ['', [Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$'), Validators.required]],
            new_password: ['', [Validators.minLength(5), Validators.maxLength(15), Validators.required]],
            confirm_password: ['', Validators.required],
            Iata: ['', Validators.required],
            o_address: ['', Validators.required],
            licence_number: ['', Validators.required],
            HowHear: ['', Validators.required],
            license_picture: ['', Validators.required],
        });
    }


    ngOnInit() {
        this.getCountryList();
        this.getCurrencyList();
        this.pwdShow();

        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0);
        });

        $(document).on('click', '.generate, .newpassword', function (event) {
            const pswd = $('#new_password').val();
            checkStrength(pswd);
        });
        $(document).on('keyup', '.newpassword', function (event) {
            const pswd = $('#new_password').val();
            checkStrength(pswd);
        });

        function checkStrength(password) {
            let strength = 0;
            if (password === undefined || password === '') {
                $('#strenght').removeClass();
                $('#strenght').addClass('short');
                $('#strenght').html('Too short');
                return 'Too short';
            }
            if (password.length < 6) {
                $('#strenght').removeClass();
                $('#strenght').addClass('short');
                $('#strenght').html('Too short');
                return 'Too short';
            }

            if (password.length > 7) {
                strength += 1;
            }
            if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
                strength += 1;
            }
            if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) {
                strength += 1;
            }
            if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
                strength += 1;
            }
            if (password.match(/(.*[!,%,&,@,#,$,^,*,?,_,~].*[!,%,&,@,#,$,^,*,?,_,~])/)) {
                strength += 1;
            }
            if (strength < 2) {
                $('#strenght').removeClass();
                $('#strenght').addClass('weak');
                $('#strenght').html('Week');
                return 'Weak';
            } else if (strength === 2) {
                $('#strenght').removeClass();
                $('#strenght').addClass('good');
                $('#strenght').html('Good');
                return 'Good';
            } else {
                $('#strenght').removeClass();
                $('#strenght').addClass('strong');
                $('#strenght').html('Strong');
                return 'Strong';
            }
        }
    }

    clickGenerate() {
        this.paswd = this._GlobalService.generatePWD();
        $('#new_password').val(this.paswd);
        $('#confirm_password').val(this.paswd);
        $('#new_password').prop('focus', '');
    }

    pwdShow() {
        $(document).on('click', '.input-group-addon', function () {
            const pwdtype = $('#new_password').attr('type');
            if (pwdtype === 'password') {
                $('#new_password').prop('type', 'text');
                $('#eye').removeClass('fa-eye');
                $('#eye').addClass('fa-eye-slash');
            } else {
                $('#new_password').prop('type', 'password');
                $('#eye').removeClass('fa-eye-slash');
                $('#eye').addClass('fa-eye');
            }
        });
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

    getCurrencyList() {
        this._GlobalService.getAllCurrency().subscribe(
            result => {
                this.currencyArray = result['currency'];
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

    registerClick(AgencyName, country, c_phone, Website, c_person, company, city, contact_no, Surname, currency, o_pin, Fax, c_designation, Email, new_password,
    confirm_password, Iata, o_address, HowHear) {
        this._UserRegisterServive.addUser('', AgencyName, country, c_phone, Website, c_person, company, city, contact_no, Surname, currency, o_pin, Fax, c_designation, Email, new_password,
            Iata, o_address, HowHear, this.file).subscribe(
            result => {
                console.log(result);
                if (result.success === 'false') {
                    console.log('ddhdhd');
                    this.emailError = true;
                }
            }, error => {
                console.log(error);
            }
        );
        // console.log('agencyName', AgencyName);
        // console.log('country', country);
        // console.log('c_phone', c_phone);
        // console.log('Website', Website);
        // console.log('c_person', c_person);
        // console.log('company', company);
        // console.log('city', city);
        // console.log('contact_no', contact_no);
        // console.log('Surname', Surname);
        // console.log('currency', currency);
        // console.log('o_pin', o_pin);
        // console.log('Fax', Fax);
        // console.log('c_designation', c_designation);
        // console.log('Email', Email);
        // console.log('new_password', new_password);
        // console.log('confirm_password', confirm_password);
        // console.log('Iata', Iata);
        // console.log('o_address', o_address);
        // console.log('HowHear', HowHear);
        // console.log();
        // console.log();
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
}
