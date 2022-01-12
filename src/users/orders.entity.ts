import { Users } from './users.entity';
import { Products } from 'src/products/products.entity';

export class Orders {
  date: Date;
  user: Users;
  products: Products[];
}
