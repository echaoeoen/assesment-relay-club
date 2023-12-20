import { HttpStatus, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RequestContext } from 'src/common/request-context';
import SessionData from 'src/common/session';
import User from '../../entity/user.entity';

export interface RequestWithSession extends Request {
  session: SessionData;
}
export class SessionMiddleware implements NestMiddleware {
  use(req: RequestWithSession, res: Response, next: NextFunction) {
    const session = req.session;
    if (session?.user) {
      RequestContext.setContext({
        user: Object.assign(new User(), session.user),
      });
      next();
    } else {
      res.status(HttpStatus.UNAUTHORIZED).json({
        message: 'not authorized',
      });
    }
  }
}
