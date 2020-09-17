import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {concatMap, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private promise: Promise<unknown>;
  private recipe: any;
  private detailsURL: string;

  constructor(private httpClient: HttpClient) {
  }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  protected httpRequest(url: string): Observable<any> {
    const ind = url.substring(
      url.indexOf('.') + 1,
      url.lastIndexOf('.')
    );
    url = url.substring(url.lastIndexOf('.'));
    url = url.substring(url.indexOf('/'));

    const PHP_API_SERVER = 'http://localhost:4200/';
    console.log(ind, url);
    return this.httpClient.get(`${PHP_API_SERVER}${ind}${url}`);
  }

  public loadRecipes(ingredients: string[], queries: string|string[]): Promise<any> {
    const randomNumb = this.randomNumber(0, 9);
    let url = 'i=';
    ingredients.forEach((ingredient, index) => {
      url += ingredient;
      if (index !== ingredients.length - 1){
        url += ',';
      }
    });
    if (typeof queries !== 'string'){
      url += '&q=';
      queries.forEach((query, index) => {
        url += query;
        if (index !== queries.length - 1){
          url += ',';
        }
      });
    }
    this.promise = new Promise((resolve, reject) => {
      this.httpRequest('http://www.recipepuppy.com/api/?' + url)
        .pipe(
          tap(res => {
            this.recipe = res.results[randomNumb];
            this.detailsURL = this.recipe.href;
            }
          ),
          concatMap(() => this.httpRequest(this.detailsURL)),
          tap( res => {
            console.log(res);
            }
          )
        )
        .toPromise()
        .then(
          () => {
            resolve();
          },
          msg => {
            // this.loadRecipes(['onion'], '');
          }
        );
    });
    return this.promise;
  }

  public getRandomRecipes(): any {
    return this.recipe;
  }

  private randomNumber(min, max): number {
    return (Math.random() * (max - min) + min).toFixed();
  }

}
