import { ProductEffects } from './store/product.effects';
import { ProductService } from './services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { ProductsListComponent } from './component/products-list/products-list.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { productReducer } from './store/product.reducers';
import { CreateProductComponent } from './component/create-product/create-product.component';

@NgModule({
  declarations: [
    ProductsListComponent,
    CreateProductComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    StoreModule.forFeature('products', productReducer),
    EffectsModule.forFeature([ProductEffects])
  ],
  providers: [ProductService],
  bootstrap: [],
  exports: [ProductsListComponent, CreateProductComponent]
})
export class ProductModule { }
