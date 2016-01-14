var Sequelize  = require('sequelize');

var sequelize = new Sequelize('mydb', 'root', 'testpwd', {
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

var User = sequelize.import('../models/students');
var Ocene = sequelize.import('../models/ocene');
var Izostanki = sequelize.import('../models/izostanki');
var Vpisi = sequelize.import('../models/vpisi');

module.exports = {

            findClass:    function(id){
                              return User.findAll(
                                {
                                  attributes:['ime', 'priimek'],
                                  where: {razred_id: id}
                                });
                    },

            createGrade: function(data){

                            User.findOne({
                              where: {ime: data.ime, priimek: data.priimek}
                            }).then(function(student){
                              Ocene.findAll().then(function(ocene){
                                Ocene.create({
                                  ocena_id: ocene.length + 1,
                                  ocena: data.ocena,
                                  students_student_id: student.student_id,
                                  predmet_id: '1'
                                }).catch(function(err) {
                                  console.log(err);
                                });
                              }).catch(function(err) {
                                console.log(err);
                              });
                            }).catch(function(err) {
                              console.log(err);
                            });
                      },

          findStudent: function(obj){
                        return User.findOne({
                            where: {ime: obj[0], priimek: obj[1]}
                          });
                        },


          missingQuery: function(obj){
                          return User.findOne({
                            where: {ime: obj.ime, priimek: obj.priimek}
                          }).then(function(student){
                            Izostanki.findAll().then(function(all){
                              console.log("DAATAA:", obj.stUr);
                              Izostanki.create({
                                izostanek_id: all.length + 2,
                                neopraviceno: obj.stUr,
                                predmet_id: '1',
                                student_id: student.student_id
                              }).then(function(dn){
                                return true;
                              }).catch(function(err){
                                console.log(err);
                                return false;
                              });
                            }).catch(function(err){
                              console.log(err);
                              return false;
                            });
                          }).catch(function(err) {
                            console.log(err);
                            return false;
                          });
                        },
  /*


    */




            createLog: function(data){
                          User.findOne({
                            where: {ime: data[0], priimek: data[1]}
                          }).then(function(student){
                            Vpisi.findAll().then(function(all){
                              Vpisi.create({
                                vpis_id: all.length + 1,
                                vpis: data[2],
                                student_id: student.student_id,
                                razred_id: student.razred_id
                              }).catch(function(err){
                                console.log(err);
                              });
                            }).catch(function(err){
                              console.log(err);
                            });
                          }).catch(function(err){
                            console.log(err);
                          });
                        }
};
