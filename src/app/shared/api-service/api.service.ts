import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {concatMap, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private promise: Promise<unknown>;
  private randomRecipes = [];
  private weeklyRecipes = [];
  private filter: any;
  private httpHeaders = new HttpHeaders({
    'x-rapidapi-host': 'tasty.p.rapidapi.com',
    'x-rapidapi-key': '2ebc11effamsh00e488b77941fe3p146743jsna110603736c7'
  });

  constructor(private httpClient: HttpClient) {
  }

  public loadTags(): Promise<unknown> {
      this.promise = new Promise((resolve, reject) => {
        if (this.filter === undefined) {
          this.httpClient.get('https://tasty.p.rapidapi.com/tags/list', {headers: this.httpHeaders})
            .pipe(
              tap(res => {
                this.filter = res;
              })
            )
            .toPromise()
            .then(
              () => {
                resolve();
              }
            );
        } else {
          resolve();
        }
      });
      return this.promise;
  }

  public getFilter(): any {
    return this.filter.results;
  }
  public loadRecipes(queries: any, random: boolean = true): Promise<any> {
    if (Array.isArray(queries)){
      queries = queries[0];
    }
    this.promise = new Promise((resolve, reject) => {
      this.httpClient.get('https://tasty.p.rapidapi.com/recipes/list?tags=' + queries.name + '&from=0&sizes=5',
        {headers: this.httpHeaders})
        .toPromise()
        .then(
          (res) => {
            if (random){
              // this.randomRecipes.push(res.results[this.randomNumber(0, 10)]);
              resolve();
            } else {
              // this.weeklyRecipes.push(res.results[1]);
              resolve();
            }
          }
        );
    });
    return this.promise;
  }

  public getRandomRecipes(): any {
    return this.randomRecipes;
  }

  public getWeeklyRecipes(): any {
    return this.weeklyRecipes;
  }

  private randomNumber(min, max): number {
    return (Math.random() * (max - min) + min).toFixed();
  }

}
