import { CreateProductComponent } from './product/component/create-product/create-product.component';
import { ProductResolver } from './product/product.resolver';
import { ProductsListComponent } from './product/component/products-list/products-list.component';
import { EffectsModule } from '@ngrx/effects';
import { ProductModule } from './product/product.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { reducers, metaReducers } from './store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

const routes = [
  {
    path: 'products',
    component: ProductsListComponent,
    resolve: {
      products: ProductResolver
    }
  },
  {path: 'create-product', component: CreateProductComponent},
  {path: '**', redirectTo: 'products'}
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ProductModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    EffectsModule.forRoot([]),
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    StoreDevtoolsModule.instrument({maxAge: 25}),
  ],
  providers: [ProductResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
