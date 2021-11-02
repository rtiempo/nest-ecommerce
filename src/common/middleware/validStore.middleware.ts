import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { stores } from 'src/db';

@Injectable()
export class ValidStoreMiddleWare implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const storeId = req.params.storeId;
    const storeExists = stores.some((store) => {
      return store.id === storeId;
    });
    if (!storeExists) {
      throw new HttpException('Store Not Found', 400);
    }
    next();
  }
}
