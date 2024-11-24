import { ApiProperty } from '@nestjs/swagger';
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ProductImage } from './product-image.entity';
import { User } from '../../auth/entities/user.entity';

@Entity({ name: 'products' })
export class Product {

  @ApiProperty({
    example: '82d0c34f-4ad9-4b57-ab28-22eaaa63c638',
    description: 'Product ID',
    uniqueItems: true
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;


  @ApiProperty({
    example: 'T-Shirt Teslo',
    description: 'Product Title',
    uniqueItems: true
  })
  @Column('text', {
    unique: true,
  })
  title: string;


  @ApiProperty({
    example: 0,
    description: 'Product Price',
  })
  @Column('float', {
    default: 0,
  })
  price: number;


  @ApiProperty({
    example: 'Introducing the Tesla Chill Collection. The Men’s Chill Crew Neck Sweatshirt has a premium, heavyweight exterior and soft fleece interior for comfort in any season.',
    description: 'Product Description',
    default: null,
  })
  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;


  @ApiProperty({
    example: 't_shirt_teslo',
    description: 'Product Slug - for SEO',
    uniqueItems: true
  })
  @Column({
    type: 'text',
    unique: true,
  })
  slug: string;


  @ApiProperty({
    example: 10,
    description: 'Product Stock',
    default: 0
  })
  @Column({
    type: 'int',
    default: 0,
  })
  stock: number;


  @ApiProperty({
    example: ['M', 'XL', 'XXL'],
    description: 'Product Sizes',
  })
  @Column({
    type: 'text',
    array: true,
  })
  sizes: string[];


  @ApiProperty({
    example: 'women',
    description: 'Product Gender',
  })
  @Column({
    type: 'text',
  })
  gender: string;


  @ApiProperty({
    example: ['sweatshirt', 'shirt'],
    description: 'Product Tags',
  })
  @Column({
    type: 'text',
    array: true,
    default: []
  })
  tags: string[];


  @ApiProperty({
    example: ['url1', 'url2'],
    description: 'Product Images',
    uniqueItems: true
  })
  @OneToMany(
    () => ProductImage,
    (productImage) => productImage.product,
    { cascade: true, eager: true }
  )
  images?: ProductImage[];


  @ManyToOne(
    () => User,
    (user) => user.product,
    { eager: true }
  )
  user: User;


  @BeforeInsert()
  checkSlugInsert() {
    if (!this.slug) {
      this.slug = this.title;
    }

    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }
  
  @BeforeUpdate()
  checkSlugUpdate() {
    if (!this.slug) {
      this.slug = this.title;
    }

    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }
  
}
