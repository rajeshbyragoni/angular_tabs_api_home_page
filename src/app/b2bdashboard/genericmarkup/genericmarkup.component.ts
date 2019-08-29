import { Component, OnInit } from '@angular/core';
import {first} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MarkupService} from '../../service/markup.service';
import {HttpClient} from '@angular/common/http';
declare var $: any;

@Component({
  selector: 'app-genericmarkup',
  templateUrl: './genericmarkup.component.html',
  styleUrls: ['./genericmarkup.component.css']
})
export class GenericmarkupComponent implements OnInit {

  genericForm:FormGroup;
  general_markup: any;
  showMsg = '';
  
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute,  private _MarkupService: MarkupService) {
    this.createFormData();
  }

  createFormData(){
    this.genericForm = this.fb.group({
      product_id:['', Validators.required],
      Markup:['', Validators.required],
      markup_type:['', Validators.required]
    });


  }


  ngOnInit() {
    this.getData();
    //this.getgenericData();
  }

  getData() {
    this._MarkupService.genericMarkup().subscribe(
      results => {
       // console.log(results);
        this.general_markup = results.general_markup;
      }, error => {
        console.log(error.toString());
      }
      );
  }




  genericFormClick(product_id, Markup, markup_type) {
    this._MarkupService.genericNewData(product_id, Markup, markup_type ).subscribe(
      results => {
        //console.log(results);
        if(results.status) {
          this.showMsg = 'true';
          setTimeout(() => {
            $('#myTab').find('a[href="#view_markup"]').trigger('click');
            this.genericForm.reset();
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
