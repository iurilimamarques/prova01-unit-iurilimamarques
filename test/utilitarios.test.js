const Utilitarios = require('../src/utilitarios');

describe('Testes da classe Utilitarios', () => {
    let utilitarios;

    beforeEach(() => {
        utilitarios = new Utilitarios();
    });

    describe('Testes de String', () => {
        test('Deve inverter uma string corretamente', () => {
            expect(utilitarios.inverterString('hello')).toBe('olleh');
            expect(utilitarios.inverterString('abc')).toBe('cba');
            expect(utilitarios.inverterString('')).toBe('');
        });

        test('Deve contar caracteres corretamente', () => {
            expect(utilitarios.contarCaracteres('hello')).toBe(5);
            expect(utilitarios.contarCaracteres('a')).toBe(1);
            expect(utilitarios.contarCaracteres('')).toBe(0);
        });

        test('Deve converter string para maiúsculas', () => {
            expect(utilitarios.paraMaiusculas('hello')).toBe('HELLO');
            expect(utilitarios.paraMaiusculas('HeLLo')).toBe('HELLO');
            expect(utilitarios.paraMaiusculas('123')).toBe('123');
        });

        test('Deve converter string para minúsculas', () => {
            expect(utilitarios.paraMinusculas('HELLO')).toBe('hello');
            expect(utilitarios.paraMinusculas('HeLLo')).toBe('hello');
            expect(utilitarios.paraMinusculas('123')).toBe('123');
        });

        test('Deve capitalizar primeira letra', () => {
            expect(utilitarios.primeiraLetraMaiuscula('hello')).toBe('Hello');
            expect(utilitarios.primeiraLetraMaiuscula('HELLO')).toBe('HELLO');
            expect(utilitarios.primeiraLetraMaiuscula('123abc')).toBe('123abc');
        });

        test('Deve remover espaços em branco', () => {
            expect(utilitarios.removerEspacos('  hello  ')).toBe('hello');
            expect(utilitarios.removerEspacos('   ')).toBe('');
            expect(utilitarios.removerEspacos('hello')).toBe('hello');
        });

        test('Deve repetir texto corretamente', () => {
            expect(utilitarios.repetirTexto('ab', 3)).toBe('ababab');
            expect(utilitarios.repetirTexto('x', 1)).toBe('x');
            expect(utilitarios.repetirTexto('ok', 0)).toBe('');
        });

        test('Deve contar palavras em uma string', () => {
            expect(utilitarios.contarPalavras('hello world')).toBe(2);
            expect(utilitarios.contarPalavras('uma palavra')).toBe(2);
            expect(utilitarios.contarPalavras('   espaços   múltiplos   ')).toBe(2);
            expect(utilitarios.contarPalavras('palavra')).toBe(1);
        });

        test('Deve verificar se string é palíndromo', () => {
            expect(utilitarios.ehPalindromo('aba')).toBe(true);
            expect(utilitarios.ehPalindromo('A man a plan a canal Panama')).toBe(true);
            expect(utilitarios.ehPalindromo('hello')).toBe(false);
            expect(utilitarios.ehPalindromo('race car')).toBe(true);
        });
    });

    describe('Testes de Operações Matemáticas', () => {
        test('Deve somar dois números', () => {
            expect(utilitarios.somar(2, 3)).toBe(5);
            expect(utilitarios.somar(-1, 1)).toBe(0);
            expect(utilitarios.somar(0, 0)).toBe(0);
        });

        test('Deve subtrair dois números', () => {
            expect(utilitarios.subtrair(5, 3)).toBe(2);
            expect(utilitarios.subtrair(1, 1)).toBe(0);
            expect(utilitarios.subtrair(-5, -3)).toBe(-2);
        });

        test('Deve multiplicar dois números', () => {
            expect(utilitarios.multiplicar(2, 3)).toBe(6);
            expect(utilitarios.multiplicar(0, 5)).toBe(0);
            expect(utilitarios.multiplicar(-2, 3)).toBe(-6);
        });

        test('Deve dividir dois números', () => {
            expect(utilitarios.dividir(6, 2)).toBe(3);
            expect(utilitarios.dividir(5, 2)).toBe(2.5);
            expect(utilitarios.dividir(-6, 2)).toBe(-3);
        });

        test('Deve lançar erro ao dividir por zero', () => {
            expect(() => utilitarios.dividir(5, 0)).toThrow('Divisão por zero');
        });

        test('Deve verificar se número é par', () => {
            expect(utilitarios.ehPar(2)).toBe(true);
            expect(utilitarios.ehPar(4)).toBe(true);
            expect(utilitarios.ehPar(1)).toBe(false);
            expect(utilitarios.ehPar(3)).toBe(false);
            expect(utilitarios.ehPar(0)).toBe(true);
        });

        test('Deve verificar se valor é número', () => {
            expect(utilitarios.ehNumero(5)).toBe(true);
            expect(utilitarios.ehNumero(0)).toBe(true);
            expect(utilitarios.ehNumero(-10)).toBe(true);
            expect(utilitarios.ehNumero('5')).toBe(false);
            expect(utilitarios.ehNumero(NaN)).toBe(false);
        });

        test('Deve calcular média de array', () => {
            expect(utilitarios.mediaArray([2, 4, 6])).toBe(4);
            expect(utilitarios.mediaArray([1, 1, 1])).toBe(1);
            expect(utilitarios.mediaArray([10])).toBe(10);
            expect(utilitarios.mediaArray([])).toBe(0);
        });
    });

    describe('Testes de Array', () => {
        test('Deve retornar primeiro elemento do array', () => {
            expect(utilitarios.primeiroElemento([1, 2, 3])).toBe(1);
            expect(utilitarios.primeiroElemento(['a', 'b'])).toBe('a');
        });

        test('Deve retornar último elemento do array', () => {
            expect(utilitarios.ultimoElemento([1, 2, 3])).toBe(3);
            expect(utilitarios.ultimoElemento(['a', 'b'])).toBe('b');
        });

        test('Deve retornar tamanho do array', () => {
            expect(utilitarios.tamanhoArray([1, 2, 3])).toBe(3);
            expect(utilitarios.tamanhoArray([])).toBe(0);
            expect(utilitarios.tamanhoArray([1])).toBe(1);
        });

        test('Deve ordenar array', () => {
            expect(utilitarios.ordenarArray([3, 1, 2])).toEqual([1, 2, 3]);
            expect(utilitarios.ordenarArray(['c', 'a', 'b'])).toEqual(['a', 'b', 'c']);
            expect(utilitarios.ordenarArray([1])).toEqual([1]);
        });

        test('Deve inverter array', () => {
            expect(utilitarios.inverterArray([1, 2, 3])).toEqual([3, 2, 1]);
            expect(utilitarios.inverterArray(['a', 'b', 'c'])).toEqual(['c', 'b', 'a']);
            expect(utilitarios.inverterArray([])).toEqual([]);
        });

        test('Deve juntar elementos do array com separador', () => {
            expect(utilitarios.juntarArray([1, 2, 3])).toBe('1,2,3');
            expect(utilitarios.juntarArray(['a', 'b', 'c'], '-')).toBe('a-b-c');
            expect(utilitarios.juntarArray([1, 2], ' ')).toBe('1 2');
        });

        test('Deve remover duplicados do array', () => {
            expect(utilitarios.removerDuplicados([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
            expect(utilitarios.removerDuplicados(['a', 'b', 'a'])).toEqual(['a', 'b']);
            expect(utilitarios.removerDuplicados([1])).toEqual([1]);
        });
    });

    describe('Testes de Números Aleatórios', () => {
        test('Deve gerar número aleatório dentro do intervalo padrão', () => {
            for (let i = 0; i < 20; i++) {
                const num = utilitarios.gerarNumeroAleatorio();
                expect(num).toBeGreaterThanOrEqual(0);
                expect(num).toBeLessThan(100);
            }
        });

        test('Deve gerar número aleatório até max especificado', () => {
            for (let i = 0; i < 20; i++) {
                const num = utilitarios.gerarNumeroAleatorio(50);
                expect(num).toBeGreaterThanOrEqual(0);
                expect(num).toBeLessThan(50);
            }
        });
    });

    describe('Testes de Objetos', () => {
        test('Deve mesclar dois objetos corretamente', () => {
            const obj1 = { a: 1, b: 2 };
            const obj2 = { c: 3, d: 4 };
            expect(utilitarios.mesclarObjetos(obj1, obj2)).toEqual({
                a: 1,
                b: 2,
                c: 3,
                d: 4
            });
        });

        test('Deve sobrescrever propriedades ao mesclar objetos', () => {
            const obj1 = { a: 1, b: 2 };
            const obj2 = { b: 5, c: 3 };
            expect(utilitarios.mesclarObjetos(obj1, obj2)).toEqual({
                a: 1,
                b: 5,
                c: 3
            });
        });

        test('Deve mesclar objetos vazios', () => {
            expect(utilitarios.mesclarObjetos({}, {})).toEqual({});
            expect(utilitarios.mesclarObjetos({ a: 1 }, {})).toEqual({ a: 1 });
        });
    });
});
