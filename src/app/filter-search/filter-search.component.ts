import { Component, OnInit } from '@angular/core';
import { faHeart as fasHeart, faSleigh, faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart, faStar as farStar, faClock, faUser } from '@fortawesome/free-regular-svg-icons';
import {NgbModal,  NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {RecipeService} from '../shared/recipes/recipe.service';
import {AppComponent} from '../app.component';
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
  modalOptions: NgbModalOptions;


  private favourite = false;
  heart = farHeart;
  numbers: number[];

  checkboxVegetarian = false;
  checkboxVegan = false;
  checkboxMeat = false;
  checkboxFish = false;
  checkboxMainDish = false;
  checkboxDessert = false;

  public loading: boolean;
  public filterRecipes: [];


  constructor(private modalService: NgbModal, private recipeService: RecipeService, public appComponent: AppComponent) {
    this.loading = false;
    this.recipeService.loadRecipes(5).then(() => {
      this.filterRecipes = this.recipeService.getFilterRecipes();
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

  // tslint:disable-next-line: typedef
  onSelectVegetarian(event) {
    if (event.target.checked) {
      (document.getElementById('checkboxVegan') as any).disabled = true;
      (document.getElementById('checkboxMeat') as any).disabled = true;
      (document.getElementById('checkboxFish') as any).disabled = true;
    } else {
      (document.getElementById('checkboxVegan') as any).disabled = false;
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
