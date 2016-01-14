/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('razredi', {
    razred_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'null',
        key: 'null'
      }
    },
    ime razreda: {
      type: DataTypes.STRING,
      allowNull: true
    },
    razrednik: {
      type: DataTypes.STRING,
      allowNull: true
    },
    professor_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'professors',
        key: 'professor_id'
      }
    }
  }, {
    tableName: 'razredi',
    freezeTableName: true
  });
};
