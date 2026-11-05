import { MongooseModule } from '@nestjs/mongoose';
import { Transacao, TransacaoSchema } from './transacao.schema';
import { Module } from '@nestjs/common';
import { TransacoesController } from './transacoes.controller';
import { TransacoesService } from './transacoes.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Transacao.name, schema: TransacaoSchema }]),
  ],
  controllers: [TransacoesController],
  providers: [TransacoesService]
})
export class TransacoesModule {}
