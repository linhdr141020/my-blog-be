import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { ResponseTransformInterceptor } from './interceptors/response.transform.interceptor';

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.use(cookieParser());
  console.log(configService.get('NODE_ENV'));
  app.useGlobalInterceptors(new ResponseTransformInterceptor());
  if (configService.get('NODE_ENV') == 'development') {
    app.enableCors();
  } else {
    app.enableCors({ origin: '*', credentials: true });
  }

  await app.listen(PORT, () => console.log(`Server running om port: ${PORT}`));
}

bootstrap();
