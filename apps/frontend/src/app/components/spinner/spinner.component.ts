import {Component, OnInit} from '@angular/core';
import {ServiceHelper} from '../../services/services-helper';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  constructor(public sh: ServiceHelper) { }

  ngOnInit() {
  }

}
