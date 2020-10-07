import { Component, OnInit } from '@angular/core';
import { faHeart as fasHeart, faSleigh, faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart, faStar as farStar, faClock, faUser } from '@fortawesome/free-regular-svg-icons';
import { CheckboxControlValueAccessor } from '@angular/forms';
import { $ } from 'protractor';

@Component({
  selector: 'app-ingredient-search',
  templateUrl: './ingredient-search.component.html',
  styleUrls: ['./ingredient-search.component.scss']
})
export class IngredientSearchComponent implements OnInit {

  farHeart = farHeart;
  fasHeart = fasHeart;
  fasStar = fasStar;
  farStar = farStar;
  farClock = faClock;
  farUsers = faUser;


  private favourite = false;
  heart = farHeart;
  numbers: number[];

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

}
