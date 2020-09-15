import { Component, OnInit } from '@angular/core';
import { faHeart as fasHeart, faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart, faStar as farStar, faClock, faUser } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  farHeart = farHeart;
  fasHeart = fasHeart;
  fasStar = fasStar;
  farStar = farStar;
  farClock = faClock;
  farUsers = faUser;

  private favourite = false;
  numbers: number[];
  heart = farHeart;

  constructor() {
    this.numbers = Array(3).fill(0).map((x, i) => i);
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
