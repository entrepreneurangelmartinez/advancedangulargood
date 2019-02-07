import { Injectable, Inject } from '@angular/core';
import { GitSearch } from './git-search';
import { GitSearchusers} from './git-searchusers';
import { HttpClient } from '@angular/common/http';
import 'rxjs-compat/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})
export class GitSearchService {

  cachedValues : Array<{
    [query: string] : GitSearch
  }> = [];

  cachedUserValues : Array<{
    [query: string] : GitSearchusers
  }> = [];
  constructor(private http: HttpClient) { }

  // gitSearch = (query: string)  : Promise<GitSearch> => {
  //   let promise = new Promise((resolve, reject)=> {
  //     if(this.cachedValues[query]) {
  //       resolve(this.cachedValues[query]);
  //     }
  //     else {
  //       // resolve("PlaceHolder");
  //       this.http.get('https://api.github.com/search/repositories?q='+ query)
  //       .toPromise() //convirtiendo el observable en una promesa
  //       .then( (response) => {
  //         resolve(response);
  //       }, (error) => {
  //         reject(error);
  //       } )
  //     }
  //   })
  //   return promise;
  // }
  gitSearch = (query: string): Promise<GitSearch> => {
    let promise = new Promise<GitSearch>((resolve, reject) => {
        if (this.cachedValues[query]) {
            resolve(this.cachedValues[query])
        }
        else {
            this.http.get('https://api.github.com/search/repositories?q=' + query)
            .toPromise()
            .then( (response) => {
                resolve(response as GitSearch)
            }, (error) => {
                reject(error);
            })
        }
    })
    return promise;
  }

  gitSearchUsers = (query: string): Promise<GitSearchusers> => {
    let promise = new Promise<GitSearchusers>((resolve, reject) => {
        if (this.cachedUserValues[query]) {
            resolve(this.cachedUserValues[query])
        }
        else {
            this.http.get('https://api.github.com/search/users?q=' + query)
            .toPromise()
            .then( (response) => {
                resolve(response as GitSearchusers)
            }, (error) => {
                reject(error);
            })
        }
    })
    return promise;
  }
}
