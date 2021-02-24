const Sequelize = require('sequelize')
const Model = Sequelize.Model

class Job_status extends Model{}

function init_Job_status(sequelize) {
    Job_status.init(
        {
            status: {type: Sequelize.STRING, allowNull: false, primaryKey: true}
        },
        {sequelize, modelName: 'job_status', tableName: 'job_status', timestamps: false}
    )
}


module.exports =  (sequelize) => {init_Job_status(sequelize); return Job_status;}