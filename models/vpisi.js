/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vpisi', {
    vpis_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'null',
        key: 'null'
      }
    },
    vpis: {
      type: DataTypes.STRING,
      allowNull: true
    },
    student_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'students',
        key: 'student_id'
      }
    },
    razred_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'students',
        key: 'razred_id'
      }
    }
  }, {
    tableName: 'vpisi',
    freezeTableName: true
  });
};
