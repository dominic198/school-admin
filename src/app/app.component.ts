import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from './shared/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private commonService: CommonService, private spinner: NgxSpinnerService,){}
  ngOnInit(): void {
      this.commonService.loadingIndicator.subscribe((val) => {     
       if (val) {
         this.spinner.show();
       } else if (!val) {
         this.spinner.hide()
       }
     })
  }
  title = 'lang-admin';
 
}
