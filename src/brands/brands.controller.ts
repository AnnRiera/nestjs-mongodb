import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';

import { BrandsService } from './brands.service';
import { ParseIntPipe } from 'src/common/parse-int.pipe';
import { CreateBrandDto, UpdateBrandDto } from './brands.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('brands')
@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}

  @Get()
  @ApiOperation({ summary: 'List of brands' })
  getAll() {
    return this.brandsService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a brand' })
  create(@Body() payload: CreateBrandDto) {
    return this.brandsService.create(payload);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get brand by id' })
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.brandsService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update brand by id' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateBrandDto,
  ) {
    return this.brandsService.update(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete brand by id' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.brandsService.delete(id);
  }
}
