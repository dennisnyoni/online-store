import { Component } from '@angular/core';
import {ProductService} from "../services/product.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  productName: string = '';
  category: string = '';
  price: number=0;


  constructor(private productService: ProductService) {}

  searchProducts() {
    // Create an object to represent the filter criteria
    const filterCriteria: any = {};

    // Populate the filterCriteria object with selected filter options
    if (this.productName) {
      filterCriteria.productName = this.productName;
    }
    if (this.category) {
      filterCriteria.category = this.category;
    }
    if (this.price) {
      filterCriteria.price = this.price;
    }

    // Use the product service to search products based on the selected criteria
    this.productService.searchProducts(filterCriteria).subscribe((results) => {
      // Handle the search results, e.g., update a product list in the UI
      // this.products = results;
    });
  }

}
