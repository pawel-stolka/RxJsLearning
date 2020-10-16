import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable, throwError } from 'rxjs';
import { catchError, tap, shareReplay, mergeMap, pluck, distinct, toArray, map } from 'rxjs/operators';
import { Product } from '../products/product';
import { ProductData } from '../products/product-data';
import { ProductCategory } from './product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {
  private productCategoriesUrl = 'api/productCategories';

  
  
  /*this.http.get<ProductCategory[]>(this.productCategoriesUrl)
    .pipe(
      map(products =>
        products.map(product => ({
          ...product,

        }))
      ),
      tap(data => console.log('categories', data)),
      catchError((this.handleError))
    );*/

  // All product categories
  // Instead of defining the http.get in a method in the service,
  // set the observable directly
  productCategories$ = this.http.get<ProductCategory[]>(this.productCategoriesUrl)
    .pipe(
      tap(data => console.log('categories', JSON.stringify(data))),
      shareReplay(),
      catchError((this.handleError))
    );

  // Categories for drop down list
  // categoryNames$ = this.productCategories$
  //   .pipe(
  //     mergeMap(categories => categories),
  //     pluck('name'),
  //     distinct(),
  //     toArray(),
  //     tap(c => console.log('Each category', c)),
  //     shareReplay()
  //   );

  constructor(private http: HttpClient) { }

  private handleError(err: any) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
