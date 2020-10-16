import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Product } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Product List';
  errorMessage = '';

  products$ = this.productService.products$
    .pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    )

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    // this.products$ = this.productService.products$
      // .subscribe(
      //   products => this.products = products,
      //   error => this.errorMessage = <any>error
      // );
  }

  onAdd(): void {
    console.log('Not yet implemented');
  }
}
