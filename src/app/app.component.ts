import { Component, OnInit } from '@angular/core';
import { faList } from '@fortawesome/free-solid-svg-icons';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'KochApp';
  img = 'pexels-lukas-349609.jpg';

  constructor() {
  }

  ngOnInit(): void {
  }
}
