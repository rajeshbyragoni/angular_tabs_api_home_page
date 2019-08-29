import { Component, OnInit } from '@angular/core';
import {first} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {GlobalService} from '../../service/global.service';
import {MarkupService} from '../../service/markup.service';
import {HttpClient} from '@angular/common/http';
declare var $: any;

@Component({
	selector: 'app-specificmarkup',
	templateUrl: './specificmarkup.component.html',
	styleUrls: ['./specificmarkup.component.css']
})
export class SpecificmarkupComponent implements OnInit {
	specificForm:FormGroup;
	showMsg = '';
	user_details:any = [];
	stateArray: any = [];
	countryArray: any = [];
	table:any = [];
	products:any =[]
	constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private _GlobalService: GlobalService,  private _MarkupService: MarkupService) { 
		this.createFormSpec();
	}

	createFormSpec(){
		this.specificForm = this.fb.group({
			user:['', Validators.required],
			product_id:['', Validators.required],
			country:['', Validators.required],
			airline:['', Validators.required],
			flight_type:['', Validators.required],
			first:['', Validators.required],
			Markup:['', Validators.required],
			markup_type:['', Validators.required],
		});

	}

	ngOnInit() {
		this.getSpecificData();
		this.getCountryList();

		$('#specific_product_id').on('change',function(){
			const id = $(this).val();
			if(id == 1){
				$('#hotel_data').hide();
				$('#flight_data').show();
			}
			else if(id == 2){
				$('#hotel_data').show();
				$('#flight_data').hide();
			}
			else{
				$('#hotel_data').hide();
				$('#flight_data').hide();
			}
		});

		$('#markup_type').on('change',function(){
			const id = $(this).val();
			if(id == 1){
				$('#specfic_markup_table2').hide();
				$('#specfic_markup_table').show();
			}
			else if(id == 2){
				$('#specfic_markup_table2').show();
				$('#specfic_markup_table').hide();
			}
			else{
				$('#specfic_markup_table2').hide();
				$('#specfic_markup_table').hide();
			}
		});

	}

	getSpecificData(){
		this._MarkupService.specificMarkup().subscribe(
			results => {
				console.log(results);
				this.user_details = results.user_details;
				this.products = results.products

			}, error => {
				console.log(error.toString());
			}
			);
	}
	getSpecificProduct(id){
// 		console.log($event);
// console.log($event.value);
console.log('ig', id);

		this._MarkupService.specificProduct(id).subscribe(
			results => {
				console.log(results);
				this.table = results.table;
				if (id==1) {
					$('#specfic_markup_table').html(results.table);
				}
				if (id==2) {
					$('#specfic_markup_table2').html(results.table);
				}
			}, error => {
				console.log(error.toString());
			}
			);
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

	specificClick(user, product_id, country, airline, flight_type, first, Markup, markup_type){
		console.log('dgdfg');
		this._MarkupService.specificNewData(user, product_id, country, airline, flight_type, first, Markup, markup_type).subscribe( 
			results => {
				console.log(results);
				if(results.status) {
					this.showMsg = 'true';
					setTimeout(() => {
						$('#myTab').find('a[href="#view_markup"]').trigger('click');
						this.specificForm.reset();
						this.showMsg = '';
						this.ngOnInit();
					}, 2000);
				}else {
					this.showMsg = 'false';
				}

			}, error => {
				console.log(error.toString());
			}
			)

	}

}
