import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { CategoriesModule } from './categories.module';

@Module({
  providers: [ProductsService],
  controllers: [ProductsController],
  imports: [CategoriesModule],
  exports: [ProductsService],
})
export class ProductsModule {}
