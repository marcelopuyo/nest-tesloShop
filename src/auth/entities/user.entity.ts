import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

import { Product } from "../../products/entities/product.entity";


@Entity('users')
export class User {

  @ApiProperty({
    example: '82d0c34f-4ad9-4b57-ab28-22eaaa63c638',
    description: 'User ID',
    uniqueItems: true
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;


  @ApiProperty({
    example: 'user@google.com',
    description: 'User Email',
    uniqueItems: true,
    required: true,
  })
  @Column({
    type: 'text',
    unique: true,
  })
  email: string;


  @ApiProperty({
    example: 'Abc123',
    description: 'User Password',
    required: true,
    minLength: 6,
    maxLength: 50
  })
  @Column({
    type: 'text',
    select: false
  })
  password: string;


  @ApiProperty({
    example: 'userName',
    description: 'User Fullname',
    required: true,
    minLength: 1
  })
  @Column({
    type: 'text'
  })
  fullName: string;


  @ApiProperty({
    description: 'User state',
    type: 'boolean',
    default: true,
  })
  @Column({
    type: 'bool',
    default: true
  })
  isActive: boolean;


  @ApiProperty({
    example: ['user', 'super'],
    description: 'User Roles',
  })
  @Column({
    type: 'text',
    array: true,
    default: ['user']
  })
  roles: string[];

  
  @OneToMany(
    () => Product,
    (product) => product.user
  )
  product: Product;

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }
  
  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.email = this.email.toLowerCase().trim();
  }
  
}
