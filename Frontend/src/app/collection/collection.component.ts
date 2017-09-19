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
    if(user){
      debugger;
      this.http.get(`${url}/api/collect?user=${user}`).then(
        success => {
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
    debugger;
    this.dialogHeader = '编辑';
    this.display = true;
    this.selectedItemName = collection.name;
    this.selectedItemHref = collection.href;
    this.selectedItemClass = collection.class;
    this.selectedItemTags = collection.tags;
  }

  deleteShow(collection: any) {
    this.dialogHeader = '删除';
    this.display = true;
    this.selectedItemName = collection.name;
    this.selectedItemHref = collection.href;
    this.selectedItemClass = collection.class;
    this.selectedItemTags = collection.tags;
  }

  confirm() {
    debugger;
  }
}
