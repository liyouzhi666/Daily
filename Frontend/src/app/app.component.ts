import { Component, OnInit } from '@angular/core';
import { HttpService } from './common/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  date: any;
  title = '码农日报-';
  items: any;
  testdate: any;
  constructor(private http: HttpService) { 
    var date = new Date();
    var month = date.getMonth() >= 9 ? date.getMonth()+1 : '0' + (date.getMonth()+1);
    var day = (date.getDate()-1) > 9 ? date.getDate()-1 : '0' + (date.getMonth()-1);
    this.testdate = `${date.getFullYear()}-${month}-${day}`;
    this.date = this.testdate.replace(/\-/g,"");
    debugger;
  }
    
  ngOnInit(){
    this.http.get(`http://139.196.87.132:8099/api/daily?date=${this.date}`).then(
      success => {
        this.items = success.items;
        debugger;
      }
    ).catch(
      err => {
        alert(err);
        this.items = [];
      }
    )
  }

  dateChange(event: any) {
    debugger;
    this.date = event.target.value.replace(/\-/g,"");
    this.ngOnInit();
  }
}
