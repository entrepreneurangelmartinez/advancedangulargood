import { Injectable, Inject } from '@angular/core';
import { GitSearch } from './git-search';
import { GitSearchusers } from './git-searchusers';
import { HttpClient } from '@angular/common/http';
// Como puede ver, tenemos nuestro Servicio aquí diseñado para convertir un RxJS observable en una Promesa usando el toPromiseoperador.

// Primero necesitamos agregar el Observabletipo a nuestro bloque de importación. Podemos seguir adelante y eliminar el operador toPromise, no lo necesitaremos.
// import 'rxjs-compat/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
// Para recuperar nuestro mecanismo de almacenamiento en caché, debemos agregar el publishReplayoperador a nuestro bloque de entrada.
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';


@Injectable({
  providedIn: 'root'
})
export class GitSearchService {
  // A continuación, necesitamos cambiar la matriz de valores de caché para que sea una cadena simple.
  // cachedValues: Array<{
  //   [query: string]: GitSearch
  // }> = [];
  cachedValue: string;

  cachedUserValues: Array<{
    [query: string]: GitSearchusers
  }> = [];

  // Agreguemos una nueva variable con ámbito thisdeclarando una searchvariable sobre el constructor. Le daremos el mismo tipo que el tipo de retorno de nuestra función Observable<GitSearch>,.
  search: Observable<GitSearch>;

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

  // A continuación, cambiaremos la gitSearchfirma de devolución de llamada del método para que sea una en Observablelugar de una Promise.
  // Tenga en cuenta que hemos conservado el <GitSearch>tipo de observable. Los observables todavía requieren un tipo para su valor de retorno, de manera similar a las promesas.
  // gitSearch = (query: string): Promise<GitSearch> => {
  gitSearch: Function = (query: string): Observable<GitSearch> => {



    // Ahora que tenemos un almacenamiento en caché básico, debemos deshabilitarlo para cuando ingrese una nueva consulta de búsqueda. Para hacerlo, debemos agregar un poco de lógica a una else ifdeclaración que verificará la consulta y borrará la this.searchvariable en el En caso de que aparezca una nueva consulta que lo que se almacenó previamente en la memoria caché, vuelva a llamar de forma recursiva a la función gitSearch. También debemos ajustar la definición de nuestro this.searchen un chequeo para ver si existe.
    if (!this.search) {
    // A continuación vamos a cambiar nuestra promisevariable para que sea this.search.
    this.search = this.http.get<GitSearch>('https://api.github.com/search/repositories?q=' + query)
    // Luego debemos agregar el publishReplay()método y los refCount()métodos al final de nuestra this.httpcadena de llamadas. También cachearemos nuestra búsqueda más reciente en la cachedValuevariable.
    // publishReplay(1)le dice a RxJS que almacene en caché el valor más reciente. refCount()Mantiene lo observable vivo mientras haya suscriptores.
    .publishReplay(1)
    .refCount();
  this.cachedValue = query;
    }
    else if (this.cachedValue !== query) {
      this.search = null;
      this.gitSearch(query);
  }
    // // A continuación vamos a cambiar nuestra promisevariable para que sea this.search.


    // this.search = this.http.get<GitSearch>('https://api.github.com/search/repositories?q=' + query)



    //   // Luego debemos agregar el publishReplay()método y los refCount()métodos al final de nuestra this.httpcadena de llamadas. También cachearemos nuestra búsqueda más reciente en la cachedValuevariable.
    //   // publishReplay(1)le dice a RxJS que almacene en caché el valor más reciente. refCount()Mantiene lo observable vivo mientras haya suscriptores.
    //   .publishReplay(1)
    //   .refCount();
    // this.cachedValue = query;
    return this.search;


    // let promise = new Promise<GitSearch>((resolve, reject) => {
    //   if (this.cachedValues[query]) {
    //     resolve(this.cachedValues[query])
    //   }
    //   else {
    //     this.http.get('https://api.github.com/search/repositories?q=' + query)
    //       .toPromise()
    //       .then((response) => {
    //         resolve(response as GitSearch)
    //       }, (error) => {
    //         reject(error);
    //       })
    //   }
    // })
    // return promise;
  }

  gitSearchUsers = (query: string): Promise<GitSearchusers> => {
    let promise = new Promise<GitSearchusers>((resolve, reject) => {
      if (this.cachedUserValues[query]) {
        resolve(this.cachedUserValues[query])
      }
      else {
        this.http.get('https://api.github.com/search/users?q=' + query)
          .toPromise()
          .then((response) => {
            resolve(response as GitSearchusers)
          }, (error) => {
            reject(error);
          })
      }
    })
    return promise;
  }
}
