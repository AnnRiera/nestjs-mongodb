import { Injectable, NotFoundException } from '@nestjs/common';
import { Categories } from './categories.entity';
import { CreateCategoryDto, UpdateCategoryDto } from './categories.dto';

@Injectable()
export class CategoriesService {
  private counterId = 1;
  private categories: Categories[] = [
    {
      id: 1,
      name: 'Category 1',
      description: 'This is a description',
    },
  ];

  findAll() {
    return this.categories;
  }

  findById(id: number) {
    const category = this.categories.find((item) => item.id == id);
    if (!category) {
      throw new NotFoundException(`Category ${id} not found`);
    }
    return category;
  }

  create(payload: CreateCategoryDto) {
    this.counterId += this.counterId;
    const newCategory = {
      id: this.counterId,
      ...payload,
    };

    this.categories.push(newCategory);
    return newCategory;
  }

  update(id: number, payload: UpdateCategoryDto) {
    const category = this.findById(id);
    if (!category) {
      throw new NotFoundException(`Category ${id} not found`);
    }
    const index = this.categories.findIndex((item) => item.id == id);
    this.categories[index] = {
      ...category,
      ...payload,
    };
    return this.categories[index];
  }

  delete(id: number) {
    console.log(this.categories);
    const index = this.categories.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Category ${id} not found`);
    }
    this.categories.splice(index, 1);
    return true;
  }
}
