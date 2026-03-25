const ContaBancaria = require('../src/contaBancaria');

describe('ContaBancaria', () => {
  let conta;
  let contaBancaria;

  beforeEach(() => {
    conta = {
      id: '12345',
      titular: 'João Silva',
      saldo: 1000,
      limite: 500,
      status: 'ativa',
      atualizadaEm: new Date(),
    };
    contaBancaria = new ContaBancaria(conta);
  });

  describe('Construtores e Getters', () => {
    test('deve criar uma instância de ContaBancaria', () => {
      expect(contaBancaria).toBeInstanceOf(ContaBancaria);
    });

    test('deve obter o saldo corretamente', () => {
      expect(contaBancaria.obterSaldo()).toBe(1000);
    });

    test('deve obter o titular corretamente', () => {
      expect(contaBancaria.obterTitular()).toBe('João Silva');
    });

    test('deve obter o status corretamente', () => {
      expect(contaBancaria.obterStatus()).toBe('ativa');
    });

    test('deve obter o limite corretamente', () => {
      expect(contaBancaria.obterLimite()).toBe(500);
    });
  });

  describe('Verificações de Status', () => {
    test('deve retornar true se a conta está ativa', () => {
      expect(contaBancaria.estaAtiva()).toBe(true);
    });

    test('deve retornar false se a conta não está ativa', () => {
      conta.status = 'bloqueada';
      expect(contaBancaria.estaAtiva()).toBe(false);
    });

    test('deve verificar se saldo é negativo', () => {
      conta.saldo = -100;
      expect(contaBancaria.saldoNegativo()).toBe(true);
    });

    test('deve retornar false se saldo não é negativo', () => {
      expect(contaBancaria.saldoNegativo()).toBe(false);
    });
  });

  describe('Depositar', () => {
    test('deve depositar valor positivo corretamente', () => {
      const resultado = contaBancaria.depositar(500);
      expect(resultado).toBe(true);
      expect(contaBancaria.obterSaldo()).toBe(1500);
    });

    test('deve retornar false ao depositar valor zero', () => {
      const resultado = contaBancaria.depositar(0);
      expect(resultado).toBe(false);
      expect(contaBancaria.obterSaldo()).toBe(1000);
    });

    test('deve retornar false ao depositar valor negativo', () => {
      const resultado = contaBancaria.depositar(-200);
      expect(resultado).toBe(false);
      expect(contaBancaria.obterSaldo()).toBe(1000);
    });

    test('deve atualizar a data ao depositar', () => {
      const dataBefore = contaBancaria.conta.atualizadaEm;
      contaBancaria.depositar(100);
      const dataAfter = contaBancaria.conta.atualizadaEm;
      expect(dataAfter.getTime()).toBeGreaterThanOrEqual(dataBefore.getTime());
    });
  });

  describe('Sacar', () => {
    test('deve sacar valor positivo corretamente', () => {
      const resultado = contaBancaria.sacar(300);
      expect(resultado).toBe(true);
      expect(contaBancaria.obterSaldo()).toBe(700);
    });

    test('deve retornar false ao sacar valor zero', () => {
      const resultado = contaBancaria.sacar(0);
      expect(resultado).toBe(false);
      expect(contaBancaria.obterSaldo()).toBe(1000);
    });

    test('deve retornar false ao sacar valor negativo', () => {
      const resultado = contaBancaria.sacar(-100);
      expect(resultado).toBe(false);
      expect(contaBancaria.obterSaldo()).toBe(1000);
    });

    test('deve sacar considerando o limite disponível', () => {
      const resultado = contaBancaria.sacar(1200);
      expect(resultado).toBe(true);
      expect(contaBancaria.obterSaldo()).toBe(-200);
    });

    test('deve retornar false ao sacar valor maior que saldo + limite', () => {
      const resultado = contaBancaria.sacar(2000);
      expect(resultado).toBe(false);
      expect(contaBancaria.obterSaldo()).toBe(1000);
    });

    test('deve atualizar a data ao sacar', () => {
      const dataBefore = contaBancaria.conta.atualizadaEm;
      contaBancaria.sacar(100);
      const dataAfter = contaBancaria.conta.atualizadaEm;
      expect(dataAfter.getTime()).toBeGreaterThanOrEqual(dataBefore.getTime());
    });
  });

  describe('Poderia Sacar', () => {
    test('deve retornar true para valor que pode sacar', () => {
      expect(contaBancaria.podeSacar(1500)).toBe(true);
    });

    test('deve retornar false para valor maior que saldo + limite', () => {
      expect(contaBancaria.podeSacar(2000)).toBe(false);
    });

    test('deve retornar false para valor zero', () => {
      expect(contaBancaria.podeSacar(0)).toBe(false);
    });

    test('deve retornar false para valor negativo', () => {
      expect(contaBancaria.podeSacar(-100)).toBe(false);
    });

    test('deve retornar true para valor exatamente igual a saldo + limite', () => {
      expect(contaBancaria.podeSacar(1500)).toBe(true);
    });
  });

  describe('Alteração de Titular', () => {
    test('deve alterar o titular corretamente', () => {
      const resultado = contaBancaria.alterarTitular('Maria Santos');
      expect(resultado).toBe(true);
      expect(contaBancaria.obterTitular()).toBe('Maria Santos');
    });

    test('deve retornar false ao alterar para titular vazio', () => {
      const resultado = contaBancaria.alterarTitular('');
      expect(resultado).toBe(false);
      expect(contaBancaria.obterTitular()).toBe('João Silva');
    });

    test('deve retornar false ao alterar para titular null', () => {
      const resultado = contaBancaria.alterarTitular(null);
      expect(resultado).toBe(false);
      expect(contaBancaria.obterTitular()).toBe('João Silva');
    });

    test('deve retornar false ao alterar para titular undefined', () => {
      const resultado = contaBancaria.alterarTitular(undefined);
      expect(resultado).toBe(false);
      expect(contaBancaria.obterTitular()).toBe('João Silva');
    });
  });

  describe('Bloqueio de Conta', () => {
    test('deve bloquear conta ativa corretamente', () => {
      const resultado = contaBancaria.bloquearConta();
      expect(resultado).toBe(true);
      expect(contaBancaria.obterStatus()).toBe('bloqueada');
    });

    test('deve retornar false ao tentar bloquear conta já bloqueada', () => {
      conta.status = 'bloqueada';
      const resultado = contaBancaria.bloquearConta();
      expect(resultado).toBe(false);
      expect(contaBancaria.obterStatus()).toBe('bloqueada');
    });
  });

  describe('Ativação de Conta', () => {
    test('deve ativar conta bloqueada corretamente', () => {
      conta.status = 'bloqueada';
      const resultado = contaBancaria.ativarConta();
      expect(resultado).toBe(true);
      expect(contaBancaria.obterStatus()).toBe('ativa');
    });

    test('deve retornar false ao tentar ativar conta já ativa', () => {
      const resultado = contaBancaria.ativarConta();
      expect(resultado).toBe(false);
      expect(contaBancaria.obterStatus()).toBe('ativa');
    });
  });

  describe('Encerramento de Conta', () => {
    test('deve encerrar conta com saldo zero', () => {
      conta.saldo = 0;
      const resultado = contaBancaria.encerrarConta();
      expect(resultado).toBe(true);
      expect(contaBancaria.obterStatus()).toBe('encerrada');
    });

    test('deve retornar false ao tentar encerrar conta com saldo positivo', () => {
      const resultado = contaBancaria.encerrarConta();
      expect(resultado).toBe(false);
      expect(contaBancaria.obterStatus()).toBe('ativa');
    });

    test('deve retornar false ao tentar encerrar conta com saldo negativo', () => {
      conta.saldo = -200;
      const resultado = contaBancaria.encerrarConta();
      expect(resultado).toBe(false);
      expect(contaBancaria.obterStatus()).toBe('ativa');
    });
  });

  describe('Aplicação de Tarifa', () => {
    test('deve aplicar tarifa corretamente', () => {
      const resultado = contaBancaria.aplicarTarifa(50);
      expect(resultado).toBe(true);
      expect(contaBancaria.obterSaldo()).toBe(950);
    });

    test('deve retornar false ao aplicar tarifa zero', () => {
      const resultado = contaBancaria.aplicarTarifa(0);
      expect(resultado).toBe(false);
      expect(contaBancaria.obterSaldo()).toBe(1000);
    });

    test('deve retornar false ao aplicar tarifa negativa', () => {
      const resultado = contaBancaria.aplicarTarifa(-50);
      expect(resultado).toBe(false);
      expect(contaBancaria.obterSaldo()).toBe(1000);
    });

    test('deve permitir saldo ficar negativo ao aplicar tarifa', () => {
      conta.saldo = 30;
      const resultado = contaBancaria.aplicarTarifa(50);
      expect(resultado).toBe(true);
      expect(contaBancaria.obterSaldo()).toBe(-20);
    });
  });

  describe('Ajuste de Limite', () => {
    test('deve ajustar limite para valor positivo', () => {
      const resultado = contaBancaria.ajustarLimite(1000);
      expect(resultado).toBe(true);
      expect(contaBancaria.obterLimite()).toBe(1000);
    });

    test('deve ajustar limite para zero', () => {
      const resultado = contaBancaria.ajustarLimite(0);
      expect(resultado).toBe(true);
      expect(contaBancaria.obterLimite()).toBe(0);
    });

    test('deve retornar false ao ajustar limite para valor negativo', () => {
      const resultado = contaBancaria.ajustarLimite(-500);
      expect(resultado).toBe(false);
      expect(contaBancaria.obterLimite()).toBe(500);
    });
  });

  describe('Transferências', () => {
    test('deve transferir valor para outra conta', () => {
      const contaDestino = new ContaBancaria({
        id: '54321',
        titular: 'Pedro Costa',
        saldo: 500,
        limite: 200,
        status: 'ativa',
        atualizadaEm: new Date(),
      });

      const resultado = contaBancaria.transferir(300, contaDestino);
      expect(resultado).toBe(true);
      expect(contaBancaria.obterSaldo()).toBe(700);
      expect(contaDestino.obterSaldo()).toBe(800);
    });

    test('deve retornar false ao transferir valor que excede limite', () => {
      const contaDestino = new ContaBancaria({
        id: '54321',
        titular: 'Pedro Costa',
        saldo: 500,
        limite: 200,
        status: 'ativa',
        atualizadaEm: new Date(),
      });

      const resultado = contaBancaria.transferir(2000, contaDestino);
      expect(resultado).toBe(false);
      expect(contaBancaria.obterSaldo()).toBe(1000);
      expect(contaDestino.obterSaldo()).toBe(500);
    });

    test('deve retornar false ao transferir valor negativo', () => {
      const contaDestino = new ContaBancaria({
        id: '54321',
        titular: 'Pedro Costa',
        saldo: 500,
        limite: 200,
        status: 'ativa',
        atualizadaEm: new Date(),
      });

      const resultado = contaBancaria.transferir(-100, contaDestino);
      expect(resultado).toBe(false);
      expect(contaBancaria.obterSaldo()).toBe(1000);
      expect(contaDestino.obterSaldo()).toBe(500);
    });
  });

  describe('Cálculo de Saldo Disponível', () => {
    test('deve calcular saldo disponível corretamente', () => {
      expect(contaBancaria.calcularSaldoDisponivel()).toBe(1500);
    });

    test('deve calcular saldo disponível com saldo negativo', () => {
      conta.saldo = -200;
      expect(contaBancaria.calcularSaldoDisponivel()).toBe(300);
    });

    test('deve calcular saldo disponível quando limite é zero', () => {
      conta.limite = 0;
      expect(contaBancaria.calcularSaldoDisponivel()).toBe(1000);
    });
  });

  describe('Geração de Resumo', () => {
    test('deve gerar resumo com todas as informações', () => {
      const resumo = contaBancaria.gerarResumo();
      expect(resumo).toEqual({
        titular: 'João Silva',
        saldo: 1000,
        limite: 500,
        disponivel: 1500,
        status: 'ativa',
      });
    });

    test('deve gerar resumo após múltiplas operações', () => {
      contaBancaria.depositar(500);
      contaBancaria.sacar(200);
      const resumo = contaBancaria.gerarResumo();
      expect(resumo).toEqual({
        titular: 'João Silva',
        saldo: 1300,
        limite: 500,
        disponivel: 1800,
        status: 'ativa',
      });
    });
  });

  describe('Validação de Conta', () => {
    test('deve validar conta com dados corretos', () => {
      expect(contaBancaria.validarConta()).toBe(true);
    });

    test('deve retornar false se conta não possui ID', () => {
      conta.id = '';
      expect(contaBancaria.validarConta()).toBe(false);
    });

    test('deve retornar false se conta não possui titular', () => {
      conta.titular = '';
      expect(contaBancaria.validarConta()).toBe(false);
    });

    test('deve retornar false se saldo não é um número', () => {
      conta.saldo = 'mil';
      expect(contaBancaria.validarConta()).toBe(false);
    });

    test('deve retornar false se limite é negativo', () => {
      conta.limite = -100;
      expect(contaBancaria.validarConta()).toBe(false);
    });

    test('deve retornar false se status é inválido', () => {
      conta.status = 'invalido';
      expect(contaBancaria.validarConta()).toBe(false);
    });

    test('deve validar conta com status bloqueada', () => {
      conta.status = 'bloqueada';
      expect(contaBancaria.validarConta()).toBe(true);
    });

    test('deve validar conta com status encerrada', () => {
      conta.status = 'encerrada';
      expect(contaBancaria.validarConta()).toBe(true);
    });
  });

  describe('Resetar Conta', () => {
    test('deve resetar conta para valores iniciais', () => {
      contaBancaria.depositar(500);
      contaBancaria.sacar(100);
      contaBancaria.ajustarLimite(1000);

      contaBancaria.resetarConta();

      expect(contaBancaria.obterSaldo()).toBe(0);
      expect(contaBancaria.obterLimite()).toBe(0);
      expect(contaBancaria.obterStatus()).toBe('ativa');
    });

    test('deve atualizar data ao resetar', () => {
      const dataBefore = contaBancaria.conta.atualizadaEm;
      contaBancaria.resetarConta();
      const dataAfter = contaBancaria.conta.atualizadaEm;
      expect(dataAfter.getTime()).toBeGreaterThanOrEqual(dataBefore.getTime());
    });
  });
});
