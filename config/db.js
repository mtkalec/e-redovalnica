require('sequelize');

module.exports = {
var db = new Sequelize('mydb', 'root', 'testpwd', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
      timestamps: false,
    },
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },

  });
};
