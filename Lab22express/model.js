const Sequelize = require('sequelize')

const Model = Sequelize.Model;
class Users extends Model{}
Users.init (
    {
        id:	{type: Sequelize.INTEGER, primaryKey:true, autoIncrementIdentity: true},
        username:{type: Sequelize.STRING},
        password:	{type: Sequelize.STRING}
    },
    {sequelize, modelName:'Users', tableName:'users', timestamps: false}
)

module.exports = Users