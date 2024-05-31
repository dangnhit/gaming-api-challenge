import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'types/JwtPayload';

declare global {
  namespace Express {
    export interface Request {
      jwtPayload: JwtPayload;
    }
    export interface Response {
      success(
        httpStatusCode: StatusCodes.OK | StatusCodes.CREATED | StatusCodes.ACCEPTED | StatusCodes.NO_CONTENT,
        message: string,
        data?: any,
      ): Response;
    }
  }
}
