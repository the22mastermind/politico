import pg from 'pg';
import dotenv from 'dotenv';
import pool from './database/connector';

dotenv.config();

pool.on('connect', () => {
  console.log('Connected to PSQL db');
});

// console.log(pool);

// Create Tables
const dropdb = () => {
  const drop = `DROP DATABASE IF EXISTS politico;`;
  const con = `${drop};`;
  
  pool.query(con)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });

  pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
  });
};

// Create Tables
const dropTables = () => {
  const users = `DROP TABLE IF EXISTS users CASCADE;`;
  const parties = `DROP TABLE IF EXISTS parties CASCADE;`;
  const offices = `DROP TABLE IF EXISTS offices CASCADE;`;
  const candidates = `DROP TABLE IF EXISTS candidates CASCADE;`;
  const votes = `DROP TABLE IF EXISTS votes CASCADE;`;
  const petitions = `DROP TABLE IF EXISTS petitions CASCADE;`;
  const con = `${users};${parties};${offices};${candidates};${votes};${petitions};`;
  
  pool.query(con)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });

  pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
  });
};

// Create Tables
const createTables = () => {
  const queryUsers = 
    `CREATE TABLE IF NOT EXISTS users(
      id serial PRIMARY KEY,
      firstname varchar (30) NOT NULL,
      lastname varchar (30) NOT NULL,
      othername varchar (30) NULL,
      email varchar (80) UNIQUE NOT NULL,
      phonenumber varchar (15) UNIQUE NOT NULL,
      password varchar NOT NULL,
      passporturl varchar NOT NULL,
      registered timestamptz,
      isadmin boolean DEFAULT FALSE
    );`;
  
  const queryParties =
    `CREATE TABLE IF NOT EXISTS parties (
      id serial PRIMARY KEY,
      name varchar (30),
      hqaddress varchar (150) NOT NULL,
      logourl varchar NOT NULL,
      registeredon timestamptz);`;

  const queryOffices =
    `CREATE TABLE IF NOT EXISTS offices (
      id serial PRIMARY KEY,
      type varchar (150) NOT NULL,
      name varchar (30) NOT NULL
    );`;
  
  const queryCandidate =
    `CREATE TABLE IF NOT EXISTS candidates (
      id serial PRIMARY KEY,
      office int REFERENCES offices ON DELETE CASCADE,
      party int REFERENCES parties ON DELETE CASCADE,
      candidate int REFERENCES users ON DELETE CASCADE
    );`;
  
  const queryVote =
    `CREATE TABLE IF NOT EXISTS votes (
      id serial PRIMARY KEY,
      hasvoted boolean DEFAULT FALSE,
      createdon timestamptz,
      createdby int REFERENCES users ON DELETE CASCADE,
      office int REFERENCES offices ON DELETE CASCADE,
      candidate int REFERENCES candidates ON DELETE CASCADE
    );`;

  const queryPetition =
    `CREATE TABLE IF NOT EXISTS petitions (
      id serial PRIMARY KEY,
      createdon timestamptz,
      createdby int REFERENCES users ON DELETE CASCADE,
      body varchar (150) NOT NULL,
      evidence varchar (300) NULL
    );`;

  const execute = `${queryUsers}; ${queryParties}; ${queryOffices}; ${queryCandidate}; ${queryVote}; ${queryPetition};`;
  
  pool.query(execute)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });

  pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
  });
};

export {
  dropdb,
  dropTables,
  createTables
};

require('make-runnable');
