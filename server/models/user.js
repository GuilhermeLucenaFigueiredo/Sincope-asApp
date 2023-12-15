const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Vendedor = sequelize.define('Vendedor', {
  CPF: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data_nascimento: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  empresa: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cargo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: 'vendedor',
});

const Endereco = sequelize.define('Endereco', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  vendedor_CPF: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  CEP: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  endereco: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cidade: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
});

const Nota = sequelize.define('Nota', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  vendedor_CPF: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nota: {
    type: DataTypes.TEXT,
    allowNull: false,
    field: 'nota',
  },
}, {
  timestamps: false,
  tableName: 'notas',
});

Vendedor.hasMany(Endereco, { foreignKey: 'vendedor_CPF' });
Endereco.belongsTo(Vendedor, { foreignKey: 'vendedor_CPF' });

Vendedor.hasMany(Nota, { foreignKey: 'vendedor_CPF' });
Nota.belongsTo(Vendedor, { foreignKey: 'vendedor_CPF' });

module.exports = {
  Vendedor,
  Endereco,
  Nota,
};
