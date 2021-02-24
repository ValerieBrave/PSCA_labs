const Sequelize = require('sequelize')
const Model = Sequelize.Model

class Team extends Model{}

function init_Team(sequelize) {
    Team.init(
        {
            team_id: {type:Sequelize.INTEGER, allowNull:false, primaryKey:true},
            lead_name: {type:Sequelize.STRING, allowNull: false},
            department: {type:Sequelize.STRING, allowNull: false},
            members: {type:Sequelize.INTEGER, allowNull: false}
        },
        {sequelize, modelName: 'Team', tableName: 'team', timestamps: false}
    )
}

module.exports = (sequelize) => {init_Team(sequelize); return Team;}