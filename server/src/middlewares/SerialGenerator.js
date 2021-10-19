// Basicamente pra gerar um serial ele pega quatro dígitos aleatórios, cuja a soma deles,
// vezes 10 seja divisível por 11.

const aleatorio = (min, max) => {
  return parseInt(Math.random() * (max + 1 - min) + min);
};

const GerarNumeros = (qtd) => {
  const numeros = Array(qtd)
    .fill(0)
    .reduce((nums) => {
      const NovoNumero = aleatorio(0, 9);
      const novoArray = [...nums, NovoNumero];
      return novoArray;
    }, []);
  return numeros;
};

const GerarLetras = (qtd) => {
  const letras = Array(qtd)
    .fill(0)
    .reduce((nums) => {
      const novaLetra = aleatorio(65, 90);
      const novoArray = [...nums, novaLetra];
      return novoArray;
    }, []);
  return letras;
};

const validaChaveN = (_) => {
  const PrimeiraChave = GerarNumeros(4);
  const Validação = PrimeiraChave.reduce((acc, att) => acc + att);
  return Validação % 11 === 0 ? PrimeiraChave.sort() : validaChaveN();
};

const validaChaveL = (_) => {
  const PrimeiraChave = GerarLetras(4);
  const Validação = PrimeiraChave.reduce((acc, att) => acc + att);
  return Validação % 11 === 0
    ? PrimeiraChave.map((val) => String.fromCharCode(val)).sort()
    : validaChaveL();
};

exports.gerarSerial = () => {
  const porraToda = [...validaChaveN(), ...validaChaveL(), ...validaChaveN()];
  const serial = `PDV${porraToda.join("").toUpperCase()}`;
  return serial;
};

// String.fromCharCode(num + leveller);

// Depois pega uma letra, entre A = 65 e Z = 90, cuja a soma dos valores associados a
// ele, multiplicados por 10 seja divisível por 11,

// e mais 4 dígitos aleatórios, cuja a soma deles, vezes 10, seja divisível por 11.

// Aí, ele gera a serial da seguinte forma:

// XXXAAAABBBBCCCC onde XXX não é validado, serve apenas para identificar o produto ao
// qual se refere a serial (e.g. PDV para o caixa, ERP para o ERP),

// AAAA é o grupo dos primeiros dígitos,ordenados em ordem crescente,
// BBBB são as letras, ordenadas em ordem crescente

// e CCCC é o grupo dos segu
