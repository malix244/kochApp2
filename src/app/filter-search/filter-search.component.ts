import { Component, OnInit } from '@angular/core';
import { faHeart as fasHeart, faSleigh, faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart, faStar as farStar, faClock, faUser } from '@fortawesome/free-regular-svg-icons';
import { CheckboxControlValueAccessor } from '@angular/forms';
import { $ } from 'protractor';

@Component({
  selector: 'app-filter-search',
  templateUrl: './filter-search.component.html',
  styleUrls: ['./filter-search.component.scss']
})

export class FilterSearchComponent implements OnInit {
  [x: string]: any;
  farHeart = farHeart;
  fasHeart = fasHeart;
  fasStar = fasStar;
  farStar = farStar;
  farClock = faClock;
  farUsers = faUser;


  private favourite = false;
  heart = farHeart;
  numbers: number[];

  checkboxVegetarian = false;
  checkboxVegan = false;
  checkboxMeat = false;
  checkboxFish = false;
  checkboxMainDish = false;
  checkboxDessert = false;


  constructor() {
    this.numbers = Array(10).fill(0).map((x, i) => i);
  }

  ngOnInit(): void {
  }

  changeFavourite(): void {
    if (this.favourite){
      this.favourite = false;
      this.heart = farHeart;
    } else {
      this.favourite = true;
      this.heart = fasHeart;
    }
  }

  // tslint:disable-next-line: typedef
  onSelectVegetarian(event) {
    if (event.target.checked) {
      (document.getElementById('checkboxMeat') as any).disabled = true;


      (document.getElementById('checkboxFish') as any).disabled = true;
    } else {
      (document.getElementById('checkboxMeat') as any).disabled = false;
      (document.getElementById('checkboxFish') as any).disabled = false;
    }
  }

  // tslint:disable-next-line: typedef
  onSelectVegan(event) {
    if (event.target.checked) {
      (document.getElementById('checkboxMeat') as any).disabled = true;
      (document.getElementById('checkboxFish') as any).disabled = true;
      (document.getElementById('checkboxVegetarian') as any).disabled = true;
    } else {
      (document.getElementById('checkboxMeat') as any).disabled = false;
      (document.getElementById('checkboxFish') as any).disabled = false;
      (document.getElementById('checkboxVegetarian') as any).disabled = false;
    }
  }

  // tslint:disable-next-line: typedef
  onSelectMeat(event) {
    if (event.target.checked) {
      (document.getElementById('checkboxVegetarian') as any).disabled = true;
      (document.getElementById('checkboxVegan') as any).disabled = true;
    } else {
      (document.getElementById('checkboxVegetarian') as any).disabled = false;
      (document.getElementById('checkboxVegan') as any).disabled = false;
    }
  }

  // tslint:disable-next-line: typedef
  onSelectFish(event) {
    if (event.target.checked) {
      (document.getElementById('checkboxVegetarian') as any).disabled = true;
      (document.getElementById('checkboxVegan') as any).disabled = true;
    } else {
      (document.getElementById('checkboxVegetarian') as any).disabled = false;
      (document.getElementById('checkboxVegan') as any).disabled = false;
    }
  }

  // tslint:disable-next-line: typedef
  onSelectMainDish(event) {
    if (event.target.checked) {
      (document.getElementById('checkboxDessert') as any).disabled = true;
    } else {
      (document.getElementById('checkboxDessert') as any).disabled = false;
    }
  }

  // tslint:disable-next-line: typedef
  onSelectDessert(event) {
    if (event.target.checked) {
      (document.getElementById('checkboxMainDish') as any).disabled = true;
    } else {
      (document.getElementById('checkboxMainDish') as any).disabled = false;
    }
  }

}
