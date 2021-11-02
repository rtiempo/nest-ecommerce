import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { products } from 'src/db';

@Injectable()
export class ValidProductMiddleWare implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const productId = req.params.productId;
    const productExists = products.some((product) => {
      return product.id === productId;
    });
    if (!productExists) {
      throw new HttpException('Product Not Found', 400);
    }
    next();
  }
}
