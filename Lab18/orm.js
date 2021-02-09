const Sequelize = require('sequelize')
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
        {sequelize, modelName: 'Faculty', tableName: 'faculty', timestamps: false}
    );
    Pulpit.init(
        {
            pulpit: {type: Sequelize.STRING, allowNull: false, primaryKey: true},
            pulpit_name: {type: Sequelize.STRING, allowNull: false},
            faculty: {type: Sequelize.STRING, allowNull: true, references: {model: Faculty, key: 'faculty'}}
        },
        {sequelize, modelName: 'Pulpit', tableName: 'pulpit', timestamps: false}
    );
    Teacher.init(
        {
            teacher: {type: Sequelize.STRING, allowNull: false, primaryKey: true},
            teacher_name: {type: Sequelize.STRING, allowNull: false},
            pulpit: {type: Sequelize.STRING, allowNull: true, references: {model: Pulpit, key: 'pulpit'}}
        },
        {sequelize, modelName: 'Teacher', tableName: 'teacher', timestamps: false}
    );
    Subject.init(
        {
            subject: {type: Sequelize.STRING, allowNull: false, primaryKey: true},
            subject_name: {type: Sequelize.STRING, allowNull: false},
            pulpit: {type: Sequelize.STRING, allowNull: true, references: {model: Pulpit, key: 'pulpit'}}
        },
        {sequelize, modelName: 'Subject', tableName: 'subject', timestamps: false}
    );
    Auditorium_type.init(
        {
            auditorium_type: {type: Sequelize.STRING, allowNull: false, primaryKey: true},
            auditorium_typename: {type: Sequelize.STRING, allowNull: false}
        },
        {sequelize, modelName: 'Auditorium_type', tableName: 'auditorium_type', timestamps: false}
    );
    Auditorium.init(
        {
            auditorium: {type: Sequelize.STRING, allowNull: false, primaryKey: true},
            auditorium_name: {type: Sequelize.STRING, allowNull: false},
            auditorium_capacity: {type: Sequelize.INTEGER, allowNull: false},
            auditorium_type: {type: Sequelize.STRING, allowNull: true, references: {model: Auditorium_type, key: 'auditorium_type'}}
        },
        {sequelize, modelName: 'Auditorium', tableName: 'auditorium', timestamps: false}
    );
}
exports.ORM =(sequelize) => {
    //создаем все модельки
    orm(sequelize);
    return {Faculty, Pulpit, Teacher, Subject, Auditorium_type, Auditorium};
}
