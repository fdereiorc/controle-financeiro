import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransacoesModule } from './transacoes/transacoes.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get('MONGODB_URI'),
      }),
    }),
    TransacoesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}