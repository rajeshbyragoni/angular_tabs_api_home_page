import { Component, OnInit } from '@angular/core';
import {SubAgenDepService} from '../../service/sub-agen-dep.service';

@Component({
  selector: 'app-subagentdeposit',
  templateUrl: './subagentdeposit.component.html',
  styleUrls: ['./subagentdeposit.component.css']
})
export class SubagentdepositComponent implements OnInit {

  depAmount: any;

  constructor(private subAgenDepSer: SubAgenDepService) {}

  ngOnInit() {
  	this.getData();
  }

  getData() {
    this.subAgenDepSer.getSupDep().subscribe(
        results => {
          console.log(results.deposit_amount);
          this.depAmount = results.deposit_amount;
        }, error => {
          console.log(error.toString());
        });
  }

  activate(id) {
    console.log('ddddd');
    console.log(id);
  }

}
