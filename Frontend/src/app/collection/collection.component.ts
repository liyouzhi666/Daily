import { Component, OnInit } from '@angular/core';
import { pageAnimation, tagAnimation } from '../common/public-data';
import { HttpService } from '../common/http.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css'],
  animations: [
    pageAnimation,
    tagAnimation
  ]
})
export class CollectionComponent implements OnInit {
  msgs = [];
  items: any;
  selectedItem: any;
  keywordNgModel = '';

  display = false;
  dialogHeader = '';
  selectedItemID: any;
  selectedItemName: any;
  selectedItemHref: any;
  selectedItemClass: any;
  selectedItemTags: any;

  constructor(private http: HttpService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    let url = this.http.getServerIP();
    let user = sessionStorage.getItem('realname');
    if (user) {
      this.http.get(`${url}/api/collect?user=${user}`).then(
        success => {
          debugger;
          if (success.error === '') {
            this.items = success.items;
          } else {
            this.items = [];
          }
        }
      ).catch(
        err => {
        }
        )
    } else {
      this.msgs.push({ severity: 'warn', summary: '未登录', detail: `请首先登陆账号！` });
    }
  }

  onRowSelect(event) {
    debugger;
    window.open(event.data.href);
  }

  editShow(collection: any) {
    this.dialogHeader = '编辑';
    this.display = true;
    this.selectedItemID = collection.id;
    this.selectedItemName = collection.name;
    this.selectedItemHref = collection.href;
    this.selectedItemClass = collection.class;
    this.selectedItemTags = collection.tags;
  }

  deleteShow(collection: any) {
    debugger;
    this.dialogHeader = '删除';
    this.display = true;
    this.selectedItemID = collection.id;
    this.selectedItemName = collection.name;
    this.selectedItemHref = collection.href;
    this.selectedItemClass = collection.class;
    this.selectedItemTags = collection.tags;
  }

  confirm() {
    if (this.dialogHeader === '编辑') {
      let putBody = {
        id: this.selectedItemID,
        name: this.selectedItemName,
        href: this.selectedItemHref,
        class: this.selectedItemClass,
        tags: this.selectedItemTags,
        user: sessionStorage.getItem('realname')
      }
      let url = this.http.getServerIP();
      debugger;
      this.http.put(`${url}/api/collect`, JSON.stringify(putBody)).then(
        success => {
          this.msgs = [];
          success = JSON.parse(success);
          debugger;
          if (success.info === 'edit successed!') {
            this.msgs.push({ severity: 'success', summary: '编辑成功', detail: `编辑成功！` });
            this.ngOnInit();
          } else {
            this.msgs.push({ severity: 'warn', summary: '编辑失败', detail: `${success.error}` });
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
    if (this.dialogHeader === '删除') {
      let url = this.http.getServerIP();
      debugger;
      this.http.delete(`${url}/api/collect?id=${this.selectedItemID}`).then(
        success => {
          this.msgs = [];
          success = JSON.parse(success);
          debugger;
          if (success.info === 'delete successed!') {
            this.msgs.push({ severity: 'success', summary: '删除成功', detail: `删除成功！` });
            this.ngOnInit();
          } else {
            this.msgs.push({ severity: 'warn', summary: '删除失败', detail: `${success.error}` });
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
}
