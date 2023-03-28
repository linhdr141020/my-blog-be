import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { LoggerService } from 'src/logger/custom.logger';

@Injectable()
export class ResponseTransformInterceptor<T> implements NestInterceptor<T, T> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<T> {
    const request = context.switchToHttp().getRequest();
    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        LoggerService.log(
          `[${context?.getClass().name}] : ${request?.route?.path} : ${
            request.method
          } : ${new Date(now).toISOString()} ........ : ${Date.now() - now} ms`,
        );
      }),
    );
  }
}
