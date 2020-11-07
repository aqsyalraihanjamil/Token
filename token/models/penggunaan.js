'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class penggunaan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      /** one to one -> hasOne(), belongsTo()
       *  one to many-> hasMany(), belongsToMany()
       * 
       * has -> itu dipakai ketika menghubugkan parent ke child
       * belong -> itu dipakai ketika menghubungkan child ke parent
       */
      //relasi dengan tabel pelanggan
      this.belongsTo(models.pelanggan,{
        foreignKey: 'id_pelanggan',
        as: "pelanggan"
      })
    }
  };
  penggunaan.init({
    id_penggunaan : {
      type : DataTypes.INTEGER,
      primaryKey : true,
      autoIncrement: true
    },
    id_pelanggan: DataTypes.INTEGER,
    bulan: DataTypes.STRING,
    tahun: DataTypes.STRING,
    meter_awal: DataTypes.FLOAT,
    meter_akhir: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'penggunaan',
    tableName: 'penggunaan'
  });
  return penggunaan;
};