import { Component, OnInit } from '@angular/core';
import {first} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {GlobalService} from '../../service/global.service';
import {EditsubagentService} from '../../service/editsubagent.service';
import {HttpClient} from '@angular/common/http';
@Component({
	selector: 'app-editsubagent',
	templateUrl: './editsubagent.component.html',
	styleUrls: ['./editsubagent.component.css']
})
export class EditsubagentComponent implements OnInit {
	editSubagentForm: FormGroup;
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
     id: any;

    constructor(private fb: FormBuilder, private router: Router, private _GlobalService: GlobalService, private route: ActivatedRoute, private _EditsubagentService: EditsubagentService) {
        this.editSubagentCreateForm();
    }


    editSubagentCreateForm() {
        this.editSubagentForm = this.fb.group({
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
            // license_picture: ['', Validators.required],
            currency_code: ['', Validators.required],
        });


    }

    ngOnInit() {
        this.getCountryList();
        this.getCurrencyList();
        this.route.queryParams.subscribe(params => {
            this.id = params['id'];
        });
        this.getData(this.id);
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
 
    getData(id){
        this._EditsubagentService.getEditSubAgent(id).subscribe(
            result => {
                // console.log('selva' + result);
                // if (result.status) {
                     // console.log(result.subagent['0']);
                    
                    this.editSubagentForm.get('iata').setValue(result.subagent['0'].iata);
                    this.editSubagentForm.get('no_branch').setValue(result.subagent['0'].no_branch);
                    this.editSubagentForm.get('c_person').setValue(result.subagent['0'].c_p_name);
                    this.editSubagentForm.get('c_designation').setValue(result.subagent['0'].c_p_designation);
                    this.editSubagentForm.get('c_email').setValue(result.subagent['0'].c_p_email);
                    this.editSubagentForm.get('c_phone').setValue(result.subagent['0'].c_p_phone);
                    this.editSubagentForm.get('o_address').setValue(result.subagent['0'].address);
                    this.editSubagentForm.get('o_city').setValue(result.subagent['0'].city_name);
                    this.editSubagentForm.get('o_pin').setValue(result.subagent['0'].zip_code);
                    this.editSubagentForm.get('contact_no').setValue(result.subagent['0'].mobile_phone);
                    this.editSubagentForm.get('email').setValue(result.subagent['0'].user_email);
                    this.editSubagentForm.get('pswd').setValue(result.subagent['0'].password);
                    this.profile_picture = result.subagent['0'].profile_picture;
                    // this.editSubagentForm.get('profile_picture').setValue(result.subagent['0'].profile_picture);
                    this.editSubagentForm.get('licence_number').setValue(result.subagent['0'].licence_number);
                    this.license_picture = result.subagent['0'].licence_picture;
                    // this.editSubagentForm.get('licence_picture').setValue(result.subagent['0'].licence_picture);
                    this.editSubagentForm.get('currency_code').setValue(result.subagent['0'].user_currency);
                   
                    //this.router.navigate(['/b2bdashboard']);
                // }

            }, error => {
                // console.log(error);
            }
            );
    }
    editSubagentClick(company, iata, no_branch, c_person, c_designation, c_email, c_phone, o_address, o_city, o_pin, contact_no, email, pswd,
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

         this._EditsubagentService.editSubUser(company, iata, no_branch, c_person, c_designation, c_email, c_phone, o_address, o_city, '', o_pin, contact_no, email, pswd, this.file, this.fileLi,
            licence_number, this.editSubagentForm.get('currency_code').value, this.id).subscribe(
            result => {
                //console.log('selva' + result);


                if (result.status === 1) {
                      alert('sdfsdf');
                    setTimeout(() => {
                        this.editSubagentForm.reset();
                        this.router.navigate(['/b2bdashboard']);                  
                    }, 1000)
                }
            }, error => {
                // console.log(error);
            }
        );
        

        }


    }
