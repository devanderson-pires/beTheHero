const connection = require('../database/connection');
const generateUniqueId = require('../utils/generateUniqueId');

module.exports = {
  
  // lista as ongs
  async index(req, res) {

    const ongs = await connection('ongs').select('*');
  
    return res.json(ongs);
  },

  // cria uma ong
  async create(req, res) {

    const { name, email, whatsapp, city, uf } = req.body;

    // gera um id aleatório
    const id = generateUniqueId();

    // insere a ong no banco de dados
    await connection('ongs').insert({

      id,
      name,
      email,
      whatsapp,
      city,
      uf
    });

    return res.json({ id });
  }
};
