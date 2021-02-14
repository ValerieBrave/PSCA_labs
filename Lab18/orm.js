const Sequelize = require('sequelize')
const { Op } = require('sequelize');
const Model = Sequelize.Model

class Faculty extends Model{}
class Pulpit extends Model{}
class Subject extends Model{}
class Teacher extends Model{}
class Auditorium extends Model{}
class Auditorium_type extends Model{}
 function orm(sequelize) {
    
    Faculty.init(
        {
            faculty: {type: Sequelize.STRING, allowNull: false, primaryKey: true},
            faculty_name: {type: Sequelize.STRING, allowNull: false}
        },
        {
            hooks:{
            beforeCreate: (instance, options) => { console.log('--local faculty beforeCreate hook--');},
            afterCreate: (instance, options) => { console.log('--local faculty afterCreate hook--');}        },
        sequelize, modelName: 'Faculty', tableName: 'Faculty', timestamps: false}
    );
    Pulpit.init(
        {
            pulpit: {type: Sequelize.STRING, allowNull: false, primaryKey: true},
            pulpit_name: {type: Sequelize.STRING, allowNull: false},
            faculty: {type: Sequelize.STRING, allowNull: false, references:{model: Faculty, key:'faculty'}}
        },
        {sequelize, modelName: 'Pulpit', tableName: 'Pulpit', timestamps: false}
    );
    Teacher.init(
        {
            teacher: {type: Sequelize.STRING, allowNull: false, primaryKey: true},
            teacher_name: {type: Sequelize.STRING, allowNull: false},
            pulpit: {type: Sequelize.STRING, allowNull: true, references: {model: Pulpit, key: 'pulpit'}}
        },
        {sequelize, modelName: 'Teacher', tableName: 'Teacher', timestamps: false}
    );
    Subject.init(
        {
            subject: {type: Sequelize.STRING, allowNull: false, primaryKey: true},
            subject_name: {type: Sequelize.STRING, allowNull: false},
            pulpit: {type: Sequelize.STRING, allowNull: true, references: {model: Pulpit, key: 'pulpit'}}
        },
        {sequelize, modelName: 'Subject', tableName: 'Subject', timestamps: false}
    );
    Auditorium_type.init(
        {
            auditorium_type: {type: Sequelize.STRING, allowNull: false, primaryKey: true},
            auditorium_typename: {type: Sequelize.STRING, allowNull: false}
        },
        {sequelize, modelName: 'Auditorium_type', tableName: 'Auditorium_type', timestamps: false}
    );
    Auditorium.init(
        {
            auditorium: {type: Sequelize.STRING, allowNull: false, primaryKey: true},
            auditorium_name: {type: Sequelize.STRING, allowNull: false},
            auditorium_capacity: {type: Sequelize.INTEGER, allowNull: false},
            auditorium_type: {type: Sequelize.STRING, allowNull: true, references: {model: Auditorium_type, key: 'auditorium_type'}}
        },
        {   scopes:{
            auditoriumsMore:{
                where: {auditorium_capacity: {[Op.gt]:60}}
            }},
            sequelize, modelName: 'Auditorium', tableName: 'Auditorium', timestamps: false}
    );

    Faculty.hasMany(Pulpit, {as: 'faculty_pulpits', foreignKey: 'faculty', sourceKey: 'faculty'})
    Pulpit.hasMany(Teacher, {as: 'pulpit_teacher', foreignKey: 'pulpit', sourceKey: 'pulpit'})
}
exports.ORM =(sequelize) => {
    //создаем все модельки
    orm(sequelize);
    return {Faculty, Pulpit, Teacher, Subject, Auditorium_type, Auditorium};
}
