/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('izostanki', {
    izostanek_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      //autoIncrement: true,
      primaryKey: true,
      references: {
        model: 'null',
        key: 'null'
      }
    },
    neopraviceno: {
      type: DataTypes.STRING,
      allowNull: true
    },
    predmet_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'predmeti',
        key: 'predmet_id'
      }
    },
    student_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'students',
        key: 'student_id'
      }
    }
  }, {
    tableName: 'izostanki',
    freezeTableName: true
  });
};
