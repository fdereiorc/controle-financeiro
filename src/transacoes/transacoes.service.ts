import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transacao, TransacaoDocument } from './transacao.schema';
import { CreateTransacaoDto } from './create-transacao.dto';

@Injectable()
export class TransacoesService {
  constructor(
    @InjectModel(Transacao.name)
    private transacaoModel: Model<TransacaoDocument>,
  ) {}

  async criar(dto: CreateTransacaoDto) {
    const nova = new this.transacaoModel(dto);
    return nova.save();
  }

  async listar() {
    const historico = await this.transacaoModel.find();

    const totalReceitas = historico
      .filter((transacao) => transacao.tipo === 'receita')
      .reduce((total, transacao) => total + transacao.valor, 0);
    const totalDespesas = historico
      .filter((transacao) => transacao.tipo === 'despesa')
      .reduce((total, transacao) => total + transacao.valor, 0);
    const totalGastoImpulso = historico
      .filter(
        (transacao) =>
          transacao.tipo === 'despesa' && !transacao.consumoConsciente,
      )
      .reduce((total, transacao) => total + transacao.valor, 0);
    const saldoTotal = totalReceitas - totalDespesas;

    return {
      historico,
      metricas: { saldoTotal, totalDespesas, totalGastoImpulso },
    };
  }
}
