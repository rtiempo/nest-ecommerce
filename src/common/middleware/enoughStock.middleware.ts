import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class EnoughStockMiddleWare implements NestMiddleware {
  constructor(private readonly productService: ProductService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const payload = req.body.item;
    const product = await this.productService.findOne(payload.productId);
    const index = product.variants
      .map((e) => {
        return e.name;
      })
      .indexOf(payload.productVariant);
    if (product.variants[index].stock < payload.quantity) {
      throw new HttpException('Not Enough Stock', 400);
    }
    next();
  }
}
