import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { combineLatest, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Product } from './product';
import { ProductCategoryService } from '../product-categories/product-category.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'api/products';

  products$ = this.http.get<Product[]>(this.productsUrl)
    .pipe(
      // map(products => 
      //   products.map(
      //     product => ({
      //       ...product,
      //       price: product.price * 2,
      //       // searchKey: [product.productName]
      //       category: null
      //     }) as Product
      //   )
      // ),
      catchError(this.handleError)
    )

  productsWithCategory$ = combineLatest([
      this.products$,
      this.productCategoryService.productCategories$
    ]).pipe(
      map(([products, categories]) => 
        products.map(product => ({
          ...product,
          price: product.price * 2,
          category: categories.find(c => product.categoryId === c.id).name
        }) as Product)
      )
    )

  constructor(
    private http: HttpClient,
    private productCategoryService: ProductCategoryService
    ) { }

  // getProducts(): Observable<Product[]> {
  //   return this.http.get<Product[]>(this.productsUrl)
  //     .pipe(
  //       tap(data => //console.log('All: ' + JSON.stringify(data))),
  //                 console.log(data)),
  //       catchError(this.handleError)
  //   );
  // }

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
