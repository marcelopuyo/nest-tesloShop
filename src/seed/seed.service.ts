import { Injectable } from '@nestjs/common';
import { ProductsService } from './../products/products.service';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {

  constructor(private readonly productService: ProductsService) {}

  async runSeed() {
    await this.insertNewProducts();

    return 'Seed Executed';
  }

  private async insertNewProducts() {

    //eliminar todos los productos actualmente en la DB
    await this.productService.deleteAllProducts();

    const products = initialData.products;

    const insertPromises = [];

    products.forEach((product) => {
      insertPromises.push(this.productService.create(product));
    })

    await Promise.all(insertPromises);


    return true;
  }
}
