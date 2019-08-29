import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {GlobalService} from '../../service/global.service';
import {B2bDepositManagementService} from '../../service/b2b-deposit-management.service';
import {PswdsettingService} from '../../service/pswdsetting.service';

@Component({
    selector: 'app-passwordsettings',
    templateUrl: './passwordsettings.component.html',
    styleUrls: ['./passwordsettings.component.css']
})
export class PasswordsettingsComponent implements OnInit {

    email = '';
    paswdForm: FormGroup;
    disableBtn = true;
    isValidFormSubmitted = false;

    constructor(private fb: FormBuilder, private router: Router, private _PswdsettingService: PswdsettingService) {
        this.pswdCreateForm();
    }

    pswdCreateForm() {
        this.paswdForm = this.fb.group({
            email: ['', Validators.required],
            cpswd: ['', Validators.required],
            npswd: ['', Validators.required],
            rpswd: ['', Validators.required],
        });
    }

    ngOnInit() {
        this.paswdForm.get('email').setValue(localStorage.getItem('email'));
    }

    resetPasword(cpaswd, npswd, rpswd) {
        this.isValidFormSubmitted = false;
        if (this.paswdForm.invalid) {
            return;
        }
        this.isValidFormSubmitted = true;
        this.disableBtn = false;
        console.log('cpaswd', cpaswd);
        console.log('npswd', npswd);
        console.log('rpswd', rpswd);
        this._PswdsettingService.updatePswd(cpaswd, npswd, rpswd).subscribe(results => {
            if (results.data.status === 1) {
                this.disableBtn = true;
                console.log(results);
                this.paswdForm.reset();
                this.router.navigate(['/b2bdashboard']);
            } else {
                this.disableBtn = true;
            }
        }, error => {
            this.disableBtn = true;
        });
    }


}
