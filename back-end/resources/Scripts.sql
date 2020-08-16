create table users(uid int AUTO_INCREMENT, first_name varchar(100), last_name varchar(100), 
user_name varchar(100), password varchar(20), user_mail varchar(100), is_active char(1), primary key(uid));

create table jiras(jid int AUTO_INCREMENT, title varchar(100), description varchar(500), 
status varchar(100), assigned_to varchar(20), report_date date,  primary key(jid));

create table jira_comments(cid int AUTO_INCREMENT, comment varchar(500), jira_id int, added_by varchar(100), 
add_date date,  primary key(cid));

insert into jira_comments(comment,jirajid_id,added_by, add_date) values('This issue has been fixed',1,'john stow',sysdate);

