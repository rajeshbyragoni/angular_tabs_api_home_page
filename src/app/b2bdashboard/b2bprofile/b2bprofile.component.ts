import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {GlobalService} from '../../service/global.service';
import {ProfileService} from '../../service/profile.service';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-b2bprofile',
    templateUrl: './b2bprofile.component.html',
    styleUrls: ['./b2bprofile.component.css']
})
export class B2bprofileComponent implements OnInit {

    profileForm: FormGroup;
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
    licence_picture: any;
    licenseName: string;
    emailError: boolean;
    showMsg = '';

    constructor(private fb: FormBuilder, private router: Router, private _GlobalService: GlobalService,
        private _ProfileService: ProfileService) {
        this.profileCreateForm();
    }

    profileCreateForm() {
        const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
        this.profileForm = this.fb.group({
            AgencyName: ['', Validators.required],
            // country: ['', Validators.required],
            city: ['', Validators.required],
            address: ['', Validators.required],
            zip_code: ['', Validators.required],
            Fax: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])],
            c_phone: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[6-9]\\d{9}$')])],
            Website: ['', Validators.compose([Validators.required, , Validators.pattern(reg)])],
            contact_no: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[6-9]\\d{9}$')])],
            Email: ['', [Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$'), Validators.required]],
            c_person: ['', Validators.required],
            Surname: ['', Validators.required],
            company: ['', Validators.required],
            currency: ['', Validators.required],
            c_designation: ['', Validators.required],
            Iata: ['', Validators.required],
            profile_picture: ['', Validators.required],
            licence_number: ['', Validators.required],
            // licence_picture: ['', Validators.required]
        });
    }


    ngOnInit() {
        this.getCountryList();
        this.getCurrencyList();
        this.getProfileData();
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

    getProfileData(){
        this._ProfileService.getProfileList().subscribe(
            result => {
                //console.log(result);
                if (result.status) {
                    //console.log(result.data.address_details);
                    this.profileForm.get('AgencyName').setValue(result.data.address_details.user_name);
                    //this.profileForm.get('country').setValue(result.data.address_details.country_code);
                    this.profileForm.get('city').setValue(result.data.address_details.city_name);
                    this.profileForm.get('address').setValue(result.data.address_details.address);
                    this.profileForm.get('zip_code').setValue(result.data.address_details.zip_code);
                    this.profileForm.get('Fax').setValue(result.data.address_details.fax);
                    this.profileForm.get('c_phone').setValue(result.data.address_details.c_p_phone);
                    this.profileForm.get('Website').setValue(result.data.address_details.web_name);
                    this.profileForm.get('contact_no').setValue(result.data.address_details.mobile_phone);
                    this.profileForm.get('Email').setValue(result.data.address_details.user_email);
                    this.profileForm.get('c_person').setValue(result.data.address_details.c_p_name);
                    this.profileForm.get('Surname').setValue(result.data.address_details.c_p_surname);
                    this.profileForm.get('company').setValue(result.data.address_details.company);
                    this.profileForm.get('currency').setValue(result.data.address_details.usercurrency);
                    this.profileForm.get('c_designation').setValue(result.data.address_details.c_p_designation);
                    this.profileForm.get('Iata').setValue(result.data.address_details.iata);
                    this.profile_picture = result.data.address_details.profile_picture;
                    this.profileForm.get('licence_number').setValue(result.data.address_details.licence_number);
                    //this.license_picture = result.data.address_details['0'].licence_picture;

                    //this.router.navigate(['/b2bdashboard']);
                }

            }, error => {
                // console.log(error);
            }
            );
    }


    profileClick(AgencyName, city, address, zip_code, Fax, c_phone, Website, contact_no, Email, c_person, Surname, company, currency, c_designation, Iata,
        licence_number) {
        //console.log('lllllll');
        this._ProfileService.addProfile(AgencyName, city, address, zip_code, Fax, c_phone, Website, contact_no, Email, c_person, Surname, company, currency, c_designation, Iata, this.file,
            licence_number, this.fileLi).subscribe(
            result => {
                //console.log('selva' + result);
                if (result.status === 1) {
                    this.showMsg = 'true';

                    setTimeout(() => {
                        this.profileForm.reset();
                        this.showMsg = '';
                        this.router.navigate(['/b2bdashboard']);
                        this.ngOnInit();
                    }, 2000);


                } else {
                    this.showMsg = 'false';
                }
            }, error => {
                console.log(error);
            }
            );

        }

    }
