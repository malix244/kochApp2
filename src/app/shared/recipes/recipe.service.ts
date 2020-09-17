import { Injectable } from '@angular/core';
import {ApiService} from '../api-service/api.service';
import {timeout} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipeService{
  private randomRecipe: any;
  private randomRecipes: any[];
  private randomIngrediences = [
    'garlic', 'bread', 'pasta', 'couscous', 'rice', 'flour', 'sugar', 'brown sugar', 'powdered sugar', 'baking powder',
    'Chicken stock', 'Beef stock', 'Butter', 'Heavy cream', 'Eggs', 'milk', 'Parmesan', 'Bacon', 'Parsley',
    'Celery', 'Carrots', 'Lemons', 'Limes', 'Orange juice', 'Ketchup', 'Mayonnaise', 'vegetable oil',
    'olive oil', 'Vinegar', 'Mustard', 'Honey', 'Shallots', 'Potatoes', 'Onions', 'Tomatoes', 'diced Tomatoes', 'chocolate',
    'Beans', 'Feta', 'Cheddar', 'Mozzarella', 'Cream', 'yoghurt', 'ground beef',
    'chicken', 'salami', 'shrimp', 'Cauliflower', 'spinach'
  ];

  constructor(private apiService: ApiService) {
    this.randomRecipes = [];
  }

  // arr = Array with your items,
  // n = number of items you want randomly picked and returned
  private getRandom(arr, n): any {
    const result = new Array(n);
    let len = arr.length;
    const taken = new Array(len);
    if (n > len) {
      throw new RangeError('getRandom: more elements taken than available');
    }
    while (n--) {
      const x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  }
  public getRandomRecipes(): any {
    return this.randomRecipes;
  }

  public async loadRandomRecipes(numberOfRecipes: number): Promise<any> {
    for (let i = 0; i < numberOfRecipes; i++) {
      await this.apiService.loadRecipes(this.getRandom(this.randomIngrediences, 2), '').then(() => {
        this.randomRecipe = this.apiService.getRandomRecipes();
        this.randomRecipes.push(this.randomRecipe);
      });
    }
  }
}
