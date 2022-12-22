DROP DATABASE IF EXISTS TECH_INV_WEB_APP_db;
CREATE DATABASE TECH_INV_WEB_APP_db;

use TECH_INV_WEB_APP_db;

create table user
(
   id                   integer not null auto_increment,
   name                 varchar(50),
   email                varchar(50),
   password             varchar(50),
   primary key (id)
);

create table brand
(
   id                   integer not null auto_increment,
   name                 varchar(50) not null,
   primary key (id)
);

create table address
(
   id                   integer not null auto_increment,
   name                 varchar(100) not null,
   primary key (id)
);

create table department
(
   id                   integer not null auto_increment,
   name                 varchar(50) not null,
   primary key (id)
);

create table provider
(
   id                   integer not null auto_increment,
   name                 varchar(50),
   email                varchar(50),
   tel                  varchar(25),
   primary key (id)
);

create table product
(
   id                 integer not null auto_increment ,
   name               varchar(80) not null,
   type                numeric(1) comment '1 = hardware 2 = software',
   brand_id             integer not null,
   adress_id            integer,
   department_id        integer,
   provider_id          integer,
   purchase_date        date,
   warranty             integer comment 'meses de garantia',
   FOREIGN KEY (brand_id) REFERENCES brand(id),
   FOREIGN KEY (adress_id) REFERENCES address(id),
   FOREIGN KEY (department_id) REFERENCES department(id),
   FOREIGN KEY (provider_id) REFERENCES provider    (id),
   primary key (id)
);


create table items
(
   id_hardware  integer not null,
   id_software  integer not null,
   FOREIGN KEY (id_hardware) REFERENCES product(id),
   FOREIGN KEY (id_software) REFERENCES product(id)
);
