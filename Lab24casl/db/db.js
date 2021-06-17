const Sequelize = require('sequelize')
const redis = require('redis')

global.sequelize = new Sequelize('node24lab', 'svv', 'svv', {host:'localhost', dialect:'mssql'}) 

const redisClient = redis.createClient('//redis-12268.c10.us-east-1-4.ec2.cloud.redislabs.com:12268',
{password: 'vGOK7q7JOnqMXPxPt2liKkxlgZZ88lrm'})

const {Users, Repos, Commits} = require('./models')

module.exports = {
    redisClient,
    models: {Users, Repos, Commits}
}