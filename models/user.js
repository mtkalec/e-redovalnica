/* jshint indent: 2 */
var bcrypt = require("bcrypt-nodejs");


module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'null',
        key: 'null'
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'user',
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
