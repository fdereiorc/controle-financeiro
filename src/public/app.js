const form = document.getElementById('form-transacao');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const transacao = {
    descricao: document.getElementById('descricao').value,
    valor: Number(document.getElementById('valor').value),
    tipo: document.getElementById('tipo').value,
    categoria: document.getElementById('categoria').value,
    consumoConsciente: document.getElementById('consciente').checked,
  };

  const resposta = await fetch('/transacoes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(transacao),
  });

  if (resposta.ok) {
    form.reset();
    carregarDashboard();
    alert('Transação salva!');
  } else {
    alert('Erro ao salvar. Verifique os dados.');
  }
});

async function carregarDashboard() {
  const resposta = await fetch('/transacoes');
  const dados = await resposta.json();

  document.getElementById('saldo-total').textContent = formatar(dados.metricas.saldoTotal);
  document.getElementById('total-despesas').textContent = formatar(dados.metricas.totalDespesas);
  document.getElementById('total-impulso').textContent = formatar(dados.metricas.totalGastoImpulso);

  const lista = document.getElementById('lista-extrato');
  lista.innerHTML = '';

  dados.historico.slice().reverse().forEach((t) => {
    const item = document.createElement('li');
    item.textContent = `${t.descricao} - ${t.categoria} - ${t.tipo} - ${formatar(t.valor)}`;
    lista.appendChild(item);
  });
}

function formatar(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

carregarDashboard();