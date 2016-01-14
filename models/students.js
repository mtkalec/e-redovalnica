/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('students', {
    student_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'null',
        key: 'null'
      }
    },
    ime: {
      type: DataTypes.STRING,
      allowNull: true
    },
    priimek: {
      type: DataTypes.STRING,
      allowNull: true
    },
    razrednik: {
      type: DataTypes.STRING,
      allowNull: true
    },
    razred_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'razredi',
        key: 'razred_id'
      }
    }
  }, {
    tableName: 'students',
    freezeTableName: true
  });
};
