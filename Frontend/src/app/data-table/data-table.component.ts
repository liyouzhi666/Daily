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
    display = false;
    selectedItemName: any;
    selectedItemHref: any;
    selectedItemClass: any;
    selectedItemTags: any;

    ngOnInit() {
        var date = new Date();
        date = new Date(date.getTime()-1000*60*60*24);
        var month = date.getMonth() >= 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
        var day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
        this.date = `${date.getFullYear()}${month}${day}`;
        this.getData();
    }

    getData() {
        let url = this.http.getServerIP();
        this.http.get(`${url}/api/daily?date=${this.date}`).then(
            success => {
                if(success.error === ''){
                    this.items = success.items;
                    this.isEmpty = 'success';
                } else {
                    this.isEmpty = 'empty';
                    this.items = [];
                }
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

    showLoginWindow() {
        this.display = true;
    }

    selectDate() {
        debugger;
        var month = this.selectTime.getMonth() >= 9 ? this.selectTime.getMonth() + 1 : '0' + (this.selectTime.getMonth() + 1);
        var day = this.selectTime.getDate() > 9 ? this.selectTime.getDate() : '0' + this.selectTime.getDate();
        this.date = `${this.selectTime.getFullYear()}${month}${day}`;
        this.getData();
    }

    collect(index: any) {
        if (sessionStorage.getItem('userToken')) {
            this.selectedItemName = this.items[index].name;
            this.selectedItemHref = this.items[index].href;
            this.selectedItemClass = "";
            this.selectedItemTags = "";
            this.showLoginWindow();
        } else {
            this.msgs = [];
            this.msgs.push({severity:'warn', summary:'未登录', detail:'收藏功能在账号登陆后才可使用！'});    
        }
    }

    postCollect() {
        let postBody = {
            name: this.selectedItemName,
            href: this.selectedItemHref,
            class: this.selectedItemClass,
            tags: this.selectedItemTags,
            user: sessionStorage.getItem('realname')
        }
        let url = this.http.getServerIP();
        debugger;
        this.http.post(`${url}/api/collect`, JSON.stringify(postBody)).then(
            success => {
                this.msgs = [];
                if (success.info === 'collect successed!') {
                    this.msgs.push({ severity: 'success', summary: '收藏成功', detail: `收藏成功！` });
                } else {
                    this.msgs.push({ severity: 'warn', summary: '收藏失败', detail: `${success.error}` });
                }
                this.display = false;
            }
        ).catch(
            error => {
                this.msgs.push({ severity: 'error', summary: 'error Message', detail: `${error}` });
                this.display = false;
            }
        )
    }
}