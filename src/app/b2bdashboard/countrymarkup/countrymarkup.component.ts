import { Component, OnInit } from '@angular/core';
import {first} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {GlobalService} from '../../service/global.service';
import {MarkupService} from '../../service/markup.service';
import {HttpClient} from '@angular/common/http';
declare var $: any;

@Component({
	selector: 'app-countrymarkup',
	templateUrl: './countrymarkup.component.html',
	styleUrls: ['./countrymarkup.component.css']
})
export class CountrymarkupComponent implements OnInit {

	countryForm:FormGroup;
	showMsg = '';
	country_markup:any;
	 stateArray: any = [];
	 countryArray: any = [];

	constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private _GlobalService: GlobalService,  private _MarkupService: MarkupService) {
		this.createFormCntry();
	}
	createFormCntry(){
		this.countryForm = this.fb.group({
			product_id:['', Validators.required],
			country:['', Validators.required],
			Markup:['', Validators.required],
			markup_type:['', Validators.required],
			
		});

	}


	ngOnInit() {
		 this.getCountryList();
		 this.getCountryData();
	}
	  getCountryList() {
        this._GlobalService.getCountry().subscribe(
            result => {
            	if (result['country'] !== '' ) {
            		this.countryArray = result['country'];
            	}
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


	 getCountryData() {
    this._MarkupService.countryMarkup().subscribe(
      results => {
        //console.log(results);
        this.country_markup = results.country_markup;
      }, error => {
        console.log(error.toString());
      }
      );
  }

    countryFormClick(product_id, country, Markup, markup_type) {
    	//console.log('gg');
    this._MarkupService.countryNewData(product_id, country, Markup, markup_type).subscribe(
      results => {
        //console.log(results);
        if(results.status) {
          this.showMsg = 'true';
          setTimeout(() => {
            $('#myTab').find('a[href="#view_markup"]').trigger('click');
            this.countryForm.reset();
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
