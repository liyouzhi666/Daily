import { Component, OnInit } from '@angular/core';
import { pageAnimation, tagAnimation } from '../common/public-data';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css'],
  animations: [
    pageAnimation,
    tagAnimation
  ]
})
export class TemplateComponent implements OnInit {
  msgs = [];
  constructor() { }

  ngOnInit() {
  }

}
