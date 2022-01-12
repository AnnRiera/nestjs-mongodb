import { Injectable, NotFoundException } from '@nestjs/common';
import { Customers } from './customers.entity';
import { CreateCustomerDto, UpdateCustomerDto } from './customers.dto';

@Injectable()
export class CustomersService {
  private counterId = 1;
  private customers: Customers[] = [
    {
      id: 1,
      name: 'Luis',
      lastName: 'Jiménez',
      phone: '',
    },
  ];

  findAll() {
    return this.customers;
  }

  findById(id: number) {
    const customer = this.customers.find((item) => item.id == id);
    if (!customer) {
      throw new NotFoundException(`Customer ${id} not found`);
    }
    return customer;
  }

  create(payload: CreateCustomerDto) {
    this.counterId = this.counterId + 1;
    const newCustomer = {
      id: this.counterId,
      ...payload,
    };

    this.customers.push(newCustomer);
    return newCustomer;
  }

  update(id: number, payload: UpdateCustomerDto) {
    const customer = this.findById(id);
    if (!customer) {
      throw new NotFoundException(`Customer ${id} not found`);
    }
    const index = this.customers.findIndex((item) => item.id == id);
    this.customers[index] = {
      ...customer,
      ...payload,
    };
    return this.customers[index];
  }

  delete(id: number) {
    const index = this.customers.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Customer ${id} not found`);
    }
    this.customers.splice(index, 1);
    return true;
  }
}
