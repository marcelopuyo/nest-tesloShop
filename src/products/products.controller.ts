import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from './../common/dtos/pagination.dto';
import { Auth } from './../auth/decorators/auth.decorator';
import { ValidRoles } from './../auth/interfaces/valid-roles.interface';
import { GetUser } from './../auth/decorators/get-user.decorator';
import { User } from './../auth/entities/user.entity';
import { Product } from './entities/product.entity';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Auth()
  @ApiResponse({ status:201, description: 'Product was created', type: Product })
  @ApiResponse({ status:400, description: 'Bad request' })
  @ApiResponse({ status:403, description: 'Forbidden. Token related.' })
  create(@Body() createProductDto: CreateProductDto, @GetUser() user: User) {
    return this.productsService.create(createProductDto, user);
  }

  @Get()
  @ApiResponse({ status:200, description: 'Ok', type: Product })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productsService.findAll(paginationDto);
  }

  @Get(':term')
  @ApiResponse({ status:200, description: 'Ok', type: Product })
  @ApiResponse({ status:404, description: 'Not Found' })
  findOne(@Param('term') term: string) {
    return this.productsService.findOnePlain(term);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin)
  @ApiResponse({ status:200, description: 'Ok', type: Product })
  @ApiResponse({ status:400, description: 'Bad request' })
  @ApiResponse({ status:403, description: 'Forbidden. Token related.' })
  @ApiResponse({ status:404, description: 'Not Found' })
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateProductDto: UpdateProductDto,
    @GetUser() user: User
  ) {
    return this.productsService.update(id, updateProductDto, user);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  @ApiResponse({ status:200, description: 'Ok' })
  @ApiResponse({ status:400, description: 'Bad request' })
  @ApiResponse({ status:403, description: 'Forbidden. Token related.' })
  @ApiResponse({ status:404, description: 'Not Found' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.remove(id);
  }
}
