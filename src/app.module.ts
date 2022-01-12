import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { BrandsModule } from './brands/brands.module';
import { BrandsController } from './brands/brands.controller';
import { BrandsService } from './brands/brands.service';
import { CustomersModule } from './customers/customers.module';
import { CustomersController } from './customers/customers.controller';
import { CustomersService } from './customers/customers.service';
import { DatabaseModule } from './database/database.module';
import { environments } from 'environments';
import config from './config';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    BrandsModule,
    CustomersModule,
    HttpModule,
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.number().required(),
        DATABASE_NAME: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
    }),
  ],
  controllers: [
    AppController,
    ProductsController,
    UsersController,
    BrandsController,
    CustomersController,
  ],
  providers: [
    AppService,
    ProductsService,
    UsersService,
    BrandsService,
    CustomersService,
    {
      provide: 'TASKS',
      useFactory: async (http: HttpService) => {
        const tasks = await http
          .get('https://jsonplaceholder.typicode.com/todos')
          .toPromise();
        return tasks.data;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
