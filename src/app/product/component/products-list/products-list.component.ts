import { getAllProducts } from '../../store/product.selectors';
import { productActionTypes } from '../../store/product.actions';
import { AppState } from '../../../store/reducers/index';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../../model/product.model';
import { ProductService } from '../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Update } from '@ngrx/entity';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  products$: Observable<Product[]>;

  productToBeUpdated: Product;

  isUpdateActivated = false;

  constructor(private productService: ProductService, private store: Store<AppState>) { }

  ngOnInit() {
    this.products$ = this.store.select(getAllProducts);
  }

  deleteProduct(productId: string) {
    this.store.dispatch(productActionTypes.deleteProduct({productId}));
  }

  showUpdateForm(product: Product) {
    this.productToBeUpdated = {...product};
    this.isUpdateActivated = true;
  }

  updateProduct(updateForm) {
    const update: Update<Product> = {
      id: this.productToBeUpdated.id,
      changes: {
        ...this.productToBeUpdated,
        ...updateForm.value
      }
    };

    this.store.dispatch(productActionTypes.updateProduct({update}));

    this.isUpdateActivated = false;
    this.productToBeUpdated = null;
  }
}