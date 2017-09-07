import { Component, OnInit } from '@angular/core';
import { pageAnimation, tagAnimation } from '../common/public-data';

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

  constructor() { }

  ngOnInit() {
  }

}
