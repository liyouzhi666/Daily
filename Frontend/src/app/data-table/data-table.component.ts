import { Component, OnInit } from '@angular/core';
import { beforeUrl, China, pageAnimation, tagAnimation } from '../common/public-data';
import NProgress from 'nprogress';
import { HttpService } from '../common/http.service';

@Component({
    selector: 'app-data-table',
    templateUrl: './data-table.component.html',
    styleUrls: ['./data-table.component.css'],
    animations: [
        pageAnimation,
        tagAnimation
    ]
})
export class DataTableComponent implements OnInit {
    constructor(private http: HttpService) {
        NProgress.start();
    }
    msgs: any;
    selectTime = new Date();
    date: any;
    title = '码农日报-';
    items: any;
    testdate: any;
    isEmpty: boolean = true;

    ngOnInit() {
        var date = new Date();
        var month = date.getMonth() >= 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
        var day = (date.getDate() - 1) > 9 ? date.getDate() - 1 : '0' + (date.getDate() - 1);
        this.date = `${date.getFullYear()}${month}${day}`;
        this.getData();
    }

    getData() {
        this.http.get(`http://139.196.87.132:8099/api/daily?date=${this.date}`).then(
            success => {
                this.items = success.items;
                this.isEmpty = false;
                debugger;
                NProgress.done();
            }
        ).catch(
            err => {
                // alert(err);
                this.isEmpty = true;
                this.items = [];
                NProgress.done();
            }
        )
    }

    selectDate() {
        debugger;
        var month = this.selectTime.getMonth() >= 9 ? this.selectTime.getMonth() + 1 : '0' + (this.selectTime.getMonth() + 1);
        var day = this.selectTime.getDate() > 9 ? this.selectTime.getDate() : '0' + this.selectTime.getDate();
        this.date = `${this.selectTime.getFullYear()}${month}${day}`;
        this.getData();
    }
}