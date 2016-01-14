/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('predmeti', {
    predmet_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'null',
        key: 'null'
      }
    },
    naziv: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ucitelj_id: {
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
    tableName: 'predmeti',
    freezeTableName: true
  });
};
