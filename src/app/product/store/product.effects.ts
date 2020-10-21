import { productActionTypes, productsLoaded, updateProduct } from './product.actions';
import { ProductService } from './../services/product.service';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { concatMap, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class ProductEffects {

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productActionTypes.loadProducts),
      concatMap(() => this.productService.getAllProducts()),
      map(products => productActionTypes.productsLoaded({products}))
    )
  );

  createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productActionTypes.createProduct),
      concatMap((action) => this.productService.createProduct(action.product)),
      tap(() => this.router.navigateByUrl('/products'))
    ),
    {dispatch: false}
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productActionTypes.deleteProduct),
      concatMap((action) => this.productService.deleteProduct(action.productId))
    ),
    {dispatch: false}
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productActionTypes.updateProduct),
      concatMap((action) => this.productService.updateProduct(action.update.id, action.update.changes))
    ),
    {dispatch: false}
  );

  constructor(private productService: ProductService, private actions$: Actions, private router: Router) {}
}