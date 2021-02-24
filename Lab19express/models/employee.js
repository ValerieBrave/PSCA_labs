const Sequelize = require('sequelize')
const Model = Sequelize.Model
const Team = require('./team')(sequelize)

class Employee extends Model{}

function init_Employee(sequelize) {
    Employee.init(
        {
            emp_name: {type:Sequelize.STRING, allowNull: false, primaryKey: true},
            position: {type:Sequelize.STRING, allowNull:false},
            team_id: {type:Sequelize.INTEGER, allowNull:false, references:{model: Team, key:'team_id'}}
        },
        {sequelize, modelName: 'Employee', tableName: 'employee', timestamps: false}
    )
}

module.exports = (sequelize) => {init_Employee(sequelize); return Employee;}

