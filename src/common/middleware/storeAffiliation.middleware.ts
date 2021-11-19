import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserService } from 'src/user/user.service';

@Injectable()
export class StoreAffiliationMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const payload = req.body.userId;
    const user = await this.userService.findOne(payload);
    if (user.storeId) {
      throw new HttpException(
        'User is already affiliated with another store.',
        400,
      );
    }
    next();
  }
}
