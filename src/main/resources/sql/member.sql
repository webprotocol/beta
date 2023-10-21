DROP TABLE MEMBER;

CREATE TABLE MEMBER ( 
     ID         char(100) PRIMARY KEY,
     PASSWORD   char(100) NOT NULL,
     ROLES      char(100)
);

insert into member values ('java', '1234', 'USER');
insert into member values ('python', '1234', 'USER');

commit;

select * from member;