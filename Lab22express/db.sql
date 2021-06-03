create database node22lab;
use node22lab;
create table users(
id int primary key,
username varchar(100),
password varchar(100)
);

insert into users(id, username, password) values(1, 'user1', 'password1');
select * from users;