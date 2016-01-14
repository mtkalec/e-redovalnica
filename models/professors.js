/* jshint indent: 2 */

var bcrypt = require("bcrypt-nodejs");


module.exports = function(sequelize, DataTypes) {
  return sequelize.define('professors', {
    professor_id: {
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
    username: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'professors',
    freezeTableName: true,
    instanceMethods: {
      generateHash: function(password) {
          return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
      },
      validPassword: function(password) {
            return bcrypt.compareSync(password, this.password);
      }
    }
  });
};
