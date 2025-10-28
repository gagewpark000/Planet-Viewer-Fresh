-- database m2_final_project
BEGIN TRANSACTION;

-- *************************************************************************************************
-- Drop all db objects in the proper order
-- *************************************************************************************************
<<<<<<< HEAD
DROP TABLE IF EXISTS planets;
DROP TABLE IF EXISTS solar_systems;
=======

>>>>>>> b0a9b0301d52252622a314b520944e7f62086c61
DROP TABLE IF EXISTS users;

-- *************************************************************************************************
-- Create the tables and constraints
-- *************************************************************************************************

<<<<<<< HEAD
-- users (pluralized because 'user' is a reserved word)
CREATE TABLE users (
    user_id SERIAL,
    username varchar(50) NOT NULL UNIQUE,
    password_hash varchar(200) NOT NULL,
    role varchar(50) NOT NULL,
    name varchar(50) NOT NULL,
    address varchar(100) NULL,
    city varchar(50) NULL,
    state_code char(2) NULL,
    zip varchar(5) NULL,
    CONSTRAINT PK_user PRIMARY KEY (user_id)
);

-- solar_systems
CREATE TABLE solar_systems (
    solar_system_id SERIAL PRIMARY KEY,
    name varchar(100) NOT NULL
);

-- planets
CREATE TABLE planets (
    planet_id SERIAL PRIMARY KEY,
    name text NOT NULL,
    description text,
    solar_system_id integer NOT NULL,
    CONSTRAINT fk_solar_system FOREIGN KEY (solar_system_id)
        REFERENCES solar_systems (solar_system_id)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

-- *************************************************************************************************
-- Insert sample starting data
-- *************************************************************************************************

-- Users
-- Password for all users is "password"
INSERT INTO users (username,password_hash,role,name,address,city,state_code,zip) VALUES
    ('user', '$2a$10$tmxuYYg1f5T0eXsTPlq/V.DJUKmRHyFbJ.o.liI1T35TFbjs2xiem','ROLE_USER',  'Jack O''Lantern', NULL, 'Cleveland', 'OH', '44123'),
    ('admin','$2a$10$tmxuYYg1f5T0eXsTPlq/V.DJUKmRHyFbJ.o.liI1T35TFbjs2xiem','ROLE_ADMIN', 'Jill O''Lantern', NULL, 'Beverly Hills', 'CA', '90210');

-- Solar Systems
INSERT INTO solar_systems (name)
VALUES
('Solar System 1'),
('Solar System 2');

-- Planets
INSERT INTO planets (name, description, solar_system_id)
VALUES
    ('Earth', 'Our Planet!', 1),
    ('Jupiter', 'The Gas Giant with the Big Red Spot!', 1);
=======
--users (name is pluralized because 'user' is a SQL keyword)
CREATE TABLE users (
	user_id SERIAL,
	username varchar(50) NOT NULL UNIQUE,
	password_hash varchar(200) NOT NULL,
	role varchar(50) NOT NULL,
	name varchar(50) NOT NULL,
	address varchar(100) NULL,
	city varchar(50) NULL,
	state_code char(2) NULL,
	zip varchar(5) NULL,
	CONSTRAINT PK_user PRIMARY KEY (user_id)
);

-- *************************************************************************************************
-- Insert some sample starting data
-- *************************************************************************************************

-- Users
-- Password for all users is password
INSERT INTO users (username,password_hash,role, name, address, city, state_code, zip) VALUES 
    ('user', '$2a$10$tmxuYYg1f5T0eXsTPlq/V.DJUKmRHyFbJ.o.liI1T35TFbjs2xiem','ROLE_USER',  'Jack O''Lantern', null, 'Cleveland', 'OH', '44123'),
    ('admin','$2a$10$tmxuYYg1f5T0eXsTPlq/V.DJUKmRHyFbJ.o.liI1T35TFbjs2xiem','ROLE_ADMIN', 'Jill O''Lantern', null, 'Beverly Hills', 'CA', '90210');

CREATE TABLE IF NOT EXISTS planets
(
    planet_id integer NOT NULL DEFAULT nextval('planets_planet_id_seq'::regclass),
    name text COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default",
    solar_system_id integer NOT NULL,
    CONSTRAINT planets_pkey PRIMARY KEY (planet_id),
    CONSTRAINT fk_solar_system FOREIGN KEY (solar_system_id)
        REFERENCES public.solar_systems (solar_system_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
INSERT INTO planets(planet_id, name, description, solar_system_id)
	VALUES (1, 'Earth', 'Our Planet!', 1), (2, 'Jupiter', The Gas Giant with the Big Red Spot!, 1);
>>>>>>> b0a9b0301d52252622a314b520944e7f62086c61

COMMIT TRANSACTION;
