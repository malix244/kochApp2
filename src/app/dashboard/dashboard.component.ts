import {Component, OnInit} from '@angular/core';
import {faHeart as fasHeart, faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import {faHeart as farHeart, faStar as farStar, faClock, faUser } from '@fortawesome/free-regular-svg-icons';
import {NgbModal,  NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {RecipeService} from '../shared/recipes/recipe.service';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import {AppComponent} from '../app.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  title = 'ng-bootstrap-modal-demo';
  farHeart = farHeart;
  fasHeart = fasHeart;
  heart = farHeart;
  fasStar = fasStar;
  farStar = farStar;
  farClock = faClock;
  farUsers = faUser;
  closeResult: string;
  modalOptions: NgbModalOptions;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 50;

  public randomRecipes = [];
  public weeklyRecipes = [];
  private favourite = false;
  public loading: boolean;

  constructor(private modalService: NgbModal, private recipeService: RecipeService, public appComponent: AppComponent) {
    this.loading = false;
    this.recipeService.loadRecipes(3).then(() => {
      this.randomRecipes = this.recipeService.getRandomRecipes();
      this.weeklyRecipes = this.recipeService.getWeeklyRecipes();
      if (this.randomRecipes[0] !== undefined && this.randomRecipes[1] !== undefined && this.randomRecipes[2] !== undefined &&
        this.weeklyRecipes[0] !== undefined && this.weeklyRecipes[1] !== undefined && this.weeklyRecipes[2] !== undefined) {
        this.loading = false;
      }
    });
  }

  ngOnInit(): void {}

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
