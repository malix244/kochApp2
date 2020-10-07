import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {faHeart as fasHeart, faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import {faHeart as farHeart, faStar as farStar, faClock, faUser } from '@fortawesome/free-regular-svg-icons';
import {ModalDismissReasons, NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {ApiService} from './shared/api-service/api.service';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  @ViewChild('recipeModal') recipeModal: any;

  title = 'KochApp';
  img = 'pexels-lukas-349609.jpg';
  farHeart = farHeart;
  fasHeart = fasHeart;
  heart = farHeart;
  fasStar = fasStar;
  farStar = farStar;
  farClock = faClock;
  farUsers = faUser;
  private modalOptions: NgbModalOptions;
  private closeResult: string;
  public searchedRecipes: object;
  public recipeList: object;
  public wantedRecipe: boolean;
  public searchValue: string;
  public recipe: object;
  private templateRefs: any;

  constructor(private modalService: NgbModal, private apiService: ApiService) {
    this.modalOptions = {
      windowClass: 'recipe-modal',
      backdrop: 'static',
      centered: true,
      backdropClass: 'customBackdrop',
      size: 'xl',
      scrollable: true
    };
  }

  ngOnInit(): void {
  }

  searchRecipe(content, searchQuery: any): void {
    this.wantedRecipe = false;
    this.apiService.getSearchedRecipe(searchQuery).then(() => {
      this.searchedRecipes = this.apiService.searchedRecipe;
      this.modalService.open(content, this.modalOptions).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    });
  }

  getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  findRecipes(searchValue: any): void {
    this.searchValue = searchValue;
    this.apiService.getRecipeList(this.searchValue).then(() => {
      this.recipeList = this.apiService.searchedList;
      this.wantedRecipe = true;
    });
  }

  openRecipe(id: any): void {
    this.apiService.getRecipe(id).then(() => {
      this.recipe = this.apiService.foundRecipe;
      this.open(this.recipe);
    });
  }

  checkList(searchValue): boolean {
    if (this.wantedRecipe === true && searchValue === this.searchValue){
      return true;
    }else {
      return false;
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

  open(recipe: any): void {
    this.recipe = recipe;
    this.modalService.open(this.recipeModal, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
}
