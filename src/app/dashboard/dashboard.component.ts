import { Component, OnInit } from '@angular/core';
import { faHeart as fasHeart, faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart, faStar as farStar, faClock, faUser } from '@fortawesome/free-regular-svg-icons';
import {RecipeService} from '../shared/recipes/recipe.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  farHeart = farHeart;
  fasHeart = fasHeart;
  heart = farHeart;
  fasStar = fasStar;
  farStar = farStar;
  farClock = faClock;
  farUsers = faUser;

  public randomRecipes = [];
  public weeklyRecipes = [];
  private favourite = false;
  public loading: boolean;

  constructor(private recipeService: RecipeService) {
    this.loading = true;
    this.recipeService.loadRandomRecipes(3).then(() => {
      this.randomRecipes = this.recipeService.getRandomRecipes();
      console.log(this.randomRecipes);
      if (this.randomRecipes[0] !== undefined && this.randomRecipes[1] !== undefined && this.randomRecipes[2] !== undefined) {
        this.loading = false;
      }
    });
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
