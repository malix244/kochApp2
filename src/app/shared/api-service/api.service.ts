import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private promise: Promise<unknown>;
  private recipes: any;

  constructor(private httpClient: HttpClient) {
  }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  private httpRequest(url: string): Observable<any> {
    const PHP_API_SERVER = 'http://localhost:4200/api/?';
    return this.httpClient.get(`${PHP_API_SERVER}${url}`);
  }

  public loadRecipes(): Promise<any> {
    this.promise = new Promise((resolve, reject) => {
      this.httpRequest('i=onions,garlic&q=omelet')
        .pipe(
          tap(res => {
            this.recipes = res;
            }
          )
        )
        .toPromise()
        .then(
          () => {
            resolve();
          },
          msg => {
            reject(msg);
          }
        );
    });
    return this.promise;
  }

  public getRecipes(): any {
    return this.recipes;
  }
}
