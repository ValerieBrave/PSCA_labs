var util = require('util')      // for inherits
var ee = require('events')      // for EventEmitter

var db_data = [
    {id: 1, name: 'Sherlock Holmes', bday: '1870-03-17'},
    {id: 2, name: 'Mycroft Holmes', bday: '1870-03-17'},
    {id: 3, name: 'Tommy Shelby', bday: '1887-08-22'},
    {id: 4, name: 'Arthur Shelby', bday: '1880-12-02'},
    {id: 5, name: 'Finn Shelby', bday: '1914-01-15'}
];

function DB() {
    this.commits = 0;
    this.get = () => {return db_data}
    this.post = (r) => { db_data.push(r)}
    this.delete = (i) => { db_data.splice(i-1, 1)}
    this.put = (o) => {db_data.splice(o['id']-1, 1, o)}
    this.commit = () => {this.commits++}
}

util.inherits(DB, ee.EventEmitter);
exports.DB = DB;