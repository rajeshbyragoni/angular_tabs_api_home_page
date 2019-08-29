import { Component, OnInit } from '@angular/core';
import { CommonService} from '../service/common.service';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.css']
})
export class VoucherComponent implements OnInit {

  constructor(private _CommonService: CommonService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  	this.route.queryParams.subscribe( params => {
  		this.dataLoad(params['ticket']);
  	});
  	
  }

  dataLoad(parentPNR) {
  	console.log(parentPNR);
  	// this._CommonService.
  }

}
