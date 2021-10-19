module.exports = (sequelize, Datatypes) => {
  const table = `LICENCAS${"_"}CLIENTE`;

  const Clients = sequelize.define(table, {
    // Deffino uma table com o nome de tutorial e passo os campos
    PK_SERIAL: {
      // Parametros de cada campo
      type: Datatypes.STRING(15),
      primaryKey: true,
    },
    CNPJ_CPF: {
      // Parametros de cada campo
      type: Datatypes.STRING(14),
    },
    RAZAO_SOCIAL: {
      type: Datatypes.STRING(64),
    },
    STATUS: {
      type: Datatypes.STRING(1),
    },
    VALIDADE: {
      type: Datatypes.DATEONLY,
    },
    TOLERANCIA: {
      type: Datatypes.STRING(2),
    },
    MOTIV_BLOQUEIO: {
      type: Datatypes.STRING,
    },
    NUM_TERMINAIS: {
      type: Datatypes.INTEGER(11),
    },
    OBSERVACOES: {
      type: Datatypes.STRING,
    },
    ULTIMA_VALID: {
      type: Datatypes.DATEONLY,
    },
    VERSAO_PDV: {
      type: Datatypes.STRING(32),
    },
  });

  return Clients;
};
