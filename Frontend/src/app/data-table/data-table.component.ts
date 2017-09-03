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
    isEmpty = '';

    ngOnInit() {
        var date = new Date();
        date = new Date(date.getTime()-1000*60*60*24);
        var month = date.getMonth() >= 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
        var day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
        this.date = `${date.getFullYear()}${month}${day}`;
        this.getData();
    }

    getData() {
        this.http.get(`http://139.196.87.132:8099/api/daily?date=${this.date}`).then(
            success => {
                this.items = success.items;
                this.isEmpty = 'success';
                debugger;
                NProgress.done();
            }
        ).catch(
            err => {
                // alert(err);
                this.isEmpty = 'empty';
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

    count() {
        if (sessionStorage.getItem('userToken')) {
            
        } else {
            this.msgs = [];
            this.msgs.push({severity:'warn', summary:'未登录', detail:'收藏功能在账号登陆后才可使用！'});    
        }
    }
}