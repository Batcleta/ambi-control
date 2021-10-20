const { LICENCAS_CLIENTE } = require("../models");
const Clients = LICENCAS_CLIENTE;

const Op = require("sequelize").Op;

const SerialGenerator = require("../middlewares/SerialGenerator");

module.exports = {
  async store(req, res) {
    const serialando = SerialGenerator.gerarSerial();

    const getDate = (data) => {
      let resDate = new Date(data);
      let newDate = new Date();
      newDate.setDate(resDate.getDate() + 1 + 365);

      return `${newDate.getFullYear()}-${
        newDate.getMonth() + 1
      }-${newDate.getDate()}`;
    };

    Clients.create({
      ...req.body,
      PK_SERIAL: serialando,
      VALIDADE: getDate(req.body.CONTR_DATE),
    })
      .then((data) => {
        res.json(data);
      })
      .catch((err) =>
        res.status(500).json({
          error: err.message || "error",
        })
      );
  },
  async findAll(req, res) {
    // paginação
    const { page } = req.query;
    const { search } = req.query;

    const pageSize = 10;

    // Convertando os valores recebidos
    const getPagination = (page, size) => {
      const limit = size ? +size : 10;
      const offset = page ? page * limit : 0;
      return { limit, offset };
    };
    // Desestruturando as variáveis
    const { limit, offset } = getPagination(page, pageSize);

    // retorno de dados
    const getData = (data, page, limit) => {
      const { count: totalItems, rows: clients } = data;
      const currentPage = page ? +page : 0;
      const totalPages = Math.ceil(totalItems / limit);
      return {
        totalItems,
        clients,
        totalPages,
        currentPage,
      };
    };

    // pesquisa
    let condition = search
      ? { RAZAO_SOCIAL: { [Op.like]: `%${search}%` } }
      : null;

    Clients.findAndCountAll({
      limit,
      offset,
      where: condition,
    })
      .then((data) => {
        const response = getData(data, page, limit);
        res.json(response);
      })
      .catch((err) =>
        res.status(500).json({
          error: err.message || "Error",
        })
      );
  },
  async findOne(req, res) {
    const { id } = req.params;
    Clients.findByPk(id)
      .then((data) => res.json(data))
      .catch((err) =>
        res.status(500).json({
          error: err.message || "Error",
        })
      );
  },
  async update(req, res) {
    // verificar se nao houve nenhuma alteração no serial antes de realizar a mudança
    const { id } = req.params;
    Clients.update(req.body, { where: { PK_SERIAL: id } })
      .then((num) => {
        if (num == 1) {
          res.json({ message: "Updated sussesfulluy" });
        } else {
          res.json({ message: `cannot updated id ${id} not found or empty` });
        }
      })
      .catch((err) =>
        res.status(500).json({
          error: err.message || `Errod on ${id}`,
        })
      );
  },
  async delete(req, res) {
    const { id } = req.params;

    Clients.destroy({ where: { PK_SERIAL: id } })
      .then((num) => {
        if (num == 1) {
          res.json({ message: "Deleted sussesfulluy" });
        } else {
          res.json({
            message: `cannot delete id ${id} not found or empty`,
          });
        }
      })
      .catch((err) =>
        res.status(500).json({
          error: err.message || `Errod on ${id}`,
        })
      );
  },
};
