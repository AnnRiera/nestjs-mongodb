import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';

import { CustomersService } from './customers.service';
import { ParseIntPipe } from 'src/common/parse-int.pipe';
import { CreateCustomerDto, UpdateCustomerDto } from './customers.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(private customerService: CustomersService) {}

  @Get()
  @ApiOperation({ summary: 'List of customers' })
  getAll() {
    return this.customerService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a customer' })
  create(@Body() payload: CreateCustomerDto) {
    return this.customerService.create(payload);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get customer by id' })
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.customerService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update customer by id' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCustomerDto,
  ) {
    return this.customerService.update(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete customer by id' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.customerService.delete(id);
  }
}
