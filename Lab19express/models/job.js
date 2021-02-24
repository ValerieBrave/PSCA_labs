const Sequelize = require('sequelize')
const Model = Sequelize.Model
const Employee = require('./employee')(sequelize)
const Job_status = require('./job_status')(sequelize)

class Job extends Model{}
function init_Job(sequelize) {
    Job.init(
        {
            job_id: {type:Sequelize.INTEGER, allowNull:false, primaryKey:true},
            status: {type:Sequelize.STRING, allowNull:false, references:{model:Job_status, key:'status'}},
            emp_name: {type:Sequelize.STRING, allowNull:false, references:{model:Employee, key:'emp_name'}},
            job_title: {type:Sequelize.STRING, allowNull:false},
            job_start: {type:Sequelize.DATE, allowNull:false}
        },
        {sequelize, modelName: 'Job', tableName: 'job', timestamps: false}
    )
}


module.exports = (sequelize) => {init_Job(sequelize); return Job;}