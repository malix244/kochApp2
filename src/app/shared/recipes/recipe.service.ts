import { Injectable } from '@angular/core';
import {ApiService} from '../api-service/api.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService{
  private randomRecipe: any;
  public randomRecipes = [];
  public weeklyRecipes = [];
  public filterRecipes = [];
  private randomFilters: any[];
  private loadFilter: boolean;

  constructor(private apiService: ApiService) {
    this.loadFilter = true;
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
  public getWeeklyRecipes(): any {
    return this.weeklyRecipes;
  }
  public getFilterRecipes(): any {
    return this.filterRecipes;
  }

  public loadRecipes(numberOfRecipes: number): Promise<any> {
    return this.apiService.loadTags().then(async () => {
      this.randomFilters = this.apiService.getFilter();
      for (let i = 0; i < numberOfRecipes; i++) {
        await this.apiService.loadRecipes(this.getRandom(this.randomFilters, 1)).then(async () => {
          this.randomRecipes = this.apiService.getRandomRecipes();
          await this.apiService.loadRecipes(this.randomFilters[i], false).then(() => {
            this.weeklyRecipes = this.apiService.getWeeklyRecipes();
          });
        });
        await this.apiService.loadRecipes(this.getRandom(this.randomFilters, 1)).then(async () => {
          this.filterRecipes = this.apiService.getFilterRecipes();
        });
      }
    });
  }
}
