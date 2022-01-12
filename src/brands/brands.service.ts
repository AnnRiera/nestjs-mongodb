import { Injectable, NotFoundException } from '@nestjs/common';
import { Brands } from './brands.entity';
import { CreateBrandDto, UpdateBrandDto } from './brands.dto';

@Injectable()
export class BrandsService {
  private counterId = 1;
  private brands: Brands[] = [
    {
      id: 1,
      name: 'Brand 1',
      image: '',
    },
  ];

  findAll() {
    return this.brands;
  }

  findById(id: number) {
    const brand = this.brands.find((item) => item.id == id);
    if (!brand) {
      throw new NotFoundException(`Brand ${id} not found`);
    }
    return brand;
  }

  create(payload: CreateBrandDto) {
    this.counterId = this.counterId + 1;
    const newBrand = {
      id: this.counterId,
      ...payload,
    };

    this.brands.push(newBrand);
    return newBrand;
  }

  update(id: number, payload: UpdateBrandDto) {
    const brand = this.findById(id);
    if (!brand) {
      throw new NotFoundException(`Brand ${id} not found`);
    }
    const index = this.brands.findIndex((item) => item.id == id);
    this.brands[index] = {
      ...brand,
      ...payload,
    };
    return this.brands[index];
  }

  delete(id: number) {
    const index = this.brands.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Brand ${id} not found`);
    }
    this.brands.splice(index, 1);
    return true;
  }
}
