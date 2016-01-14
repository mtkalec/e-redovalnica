/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ocene', {
    ocena_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'null',
        key: 'null'
      }
    },
    ocena: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    students_student_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'students',
        key: 'student_id'
      }
    },
    predmet_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'predmeti',
        key: 'predmet_id'
      }
    }
  }, {
    tableName: 'ocene',
    freezeTableName: true
  });
};
