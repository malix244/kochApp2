import { Component, OnInit } from '@angular/core';
import { faHeart as fasHeart, faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart, faStar as farStar, faClock, faUser } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-filter-search',
  templateUrl: './filter-search.component.html',
  styleUrls: ['./filter-search.component.scss']
})

export class FilterSearchComponent implements OnInit {
  farHeart = farHeart;
  fasHeart = fasHeart;
  farClock = faClock;
  farUsers = faUser;


  private favourite = false;
  heart = farHeart;

  checkbox_vegetarian = false;
  checkbox_vegan = false;
  checkbox_meat = false;
  checkbox_fish = false;
  checkbox_main_dish = false;
  checkbox_dessert = false;

  constructor() { }

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

  toggleEditable(event) {
    if(event.target.checked) {
      this.checkbox_dessert = true;
    }
  }



}