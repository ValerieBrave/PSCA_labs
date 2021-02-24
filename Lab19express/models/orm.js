
const Job_status = require('./job_status')(sequelize)
const Team = require('./team')(sequelize)
const Employee = require('./employee')(sequelize)
const Job = require('./job')(sequelize)

Employee.hasMany(Job, {as:'employees_jobs', foreignKey:'emp_name', sourceKey:'emp_name'})
Team.hasMany(Employee, {as:'teams_employees', foreignKey:'team_id', sourceKey:'team_id'})
Job_status.hasMany(Job, {as:'statuses_jobs', foreignKey:'status', sourceKey:'status'})


exports.ORM = () => {
    
    return {Job_status, Team, Employee, Job}
}