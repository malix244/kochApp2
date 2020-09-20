import {Component, OnInit} from '@angular/core';
import {faHeart as fasHeart, faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import {faHeart as farHeart, faStar as farStar, faClock, faUser } from '@fortawesome/free-regular-svg-icons';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {RecipeService} from '../shared/recipes/recipe.service';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';



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
  title = 'ng-bootstrap-modal-demo';
  closeResult: string;
  modalOptions: NgbModalOptions;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 50;

  public randomRecipes = [];
  public weeklyRecipes = [];
  private favourite = false;
  public loading: boolean;
  public currRecipe: any;

  constructor(private modalService: NgbModal, private recipeService: RecipeService) {
    this.modalOptions = {
      windowClass: 'recipe-modal',
      backdrop: 'static',
      centered: true,
      backdropClass: 'customBackdrop',
      size: 'xl',
      scrollable: true
    };
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

  getBackground(recipe: any): string{
    if (recipe.thumbnail_url !== undefined) {
      return recipe.thumbnail_url;
    } else{
      return '/assets/img/pexels-artem-beliaikin-929192.jpg';
    }
  }

  calculatedStars(rating: any): any[] {
    const stars = [];
    const fullStars = (parseFloat(rating) * 5).toFixed();
    for (let i = 0; i < 5; i++) {
      if ((i) < parseInt(fullStars, 10)) {
        stars.push(fasStar);
      } else {
        stars.push(farStar);
      }
    }
    return stars;
  }

  open(content, recipe: any): void {
    this.currRecipe = recipe;
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
