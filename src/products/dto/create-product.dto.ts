import { ApiProperty } from "@nestjs/swagger";

import { IsArray, IsIn, IsInt, IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";

export class CreateProductDto {

  @ApiProperty({
    description: 'Product Title',
    uniqueItems: true,
    required: true,
    minLength: 1
  })
  @IsString()
  @MinLength(1)
  title: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;
  
  @ApiProperty()
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  @IsOptional()
  stock?: number;

  @ApiProperty()
  @IsString({ each: true}) //cada uno de los elementos del arreglo tiene que cumplir la condicion
  @IsArray()
  sizes: string[];

  @ApiProperty()
  @IsIn(['men', 'women', 'kid', 'unisex'])
  gender: string;

  @ApiProperty()
  @IsString({ each: true}) //cada uno de los elementos del arreglo tiene que cumplir la condicion
  @IsArray()
  @IsOptional()
  tags: string[];

  @ApiProperty()
  @IsString({ each: true}) //cada uno de los elementos del arreglo tiene que cumplir la condicion
  @IsArray()
  @IsOptional()
  images?: string[];

}
