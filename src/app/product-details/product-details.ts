import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CatalogueService } from '../catalogue/catalogue.service';
import { switchMap } from 'rxjs';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [CurrencyPipe, UpperCasePipe],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails {
  private route = inject(ActivatedRoute);
  private catalogueService = inject(CatalogueService);

  readonly product = toSignal(
    this.route.params.pipe(switchMap((params) => this.catalogueService.fetchProduct(params['id']))),
    { initialValue: null },
  );
}

export default ProductDetails;
