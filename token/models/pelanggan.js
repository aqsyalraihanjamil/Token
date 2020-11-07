'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pelanggan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //relasi dengan tabel tarif
      this.belongsTo(models.tarif,{
        foreignKey: "id_tarif",
        as: "tarif"
      })
    }
  };
  pelanggan.init({
    id_pelanggan: {
      type : DataTypes.INTEGER,
      primaryKey : true,
      autoIncrement: true
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    nomor_kwh: DataTypes.STRING,
    nama_pelanggan: DataTypes.STRING,
    alamat: DataTypes.TEXT,
    id_tarif: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'pelanggan',
    tableName: 'pelanggan'
  });
  return pelanggan;
};