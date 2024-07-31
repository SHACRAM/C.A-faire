import { faker } from '@faker-js/faker';
import mysql from 'mysql2/promise'; 

const Users = [];
let numberOfUsers = 16;

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

for (let i = 0; i < numberOfUsers; i++) {
  const user = {
    nomDuSalon: faker.company.buzzNoun(),
    adresseSalon: faker.location.streetAddress({ useFullAddress: true }),
    dateOuverture: faker.date.past(),
    nombreEmployes: getRandomInt(2, 30),
    prenomGerant: faker.person.firstName(),
    nomGerant: faker.person.lastName(),
  };

  Users.push(user);
}

console.log(Users); 

const insertUsersIntoDB = async () => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'Sebastien', 
    password: 'A@49nPg0?',
    database: 'CAfaire', 
  });

  try {
    for (const user of Users) {
      const { nomDuSalon, adresseSalon, dateOuverture, nombreEmployes, prenomGerant, nomGerant } = user;
      await connection.execute(
        'INSERT INTO profile (nomDuSalon, adresseSalon, dateOuverture, nombreEmployes, prenomGerant, nomGerant) VALUES (?, ?, ?, ?, ?, ?)',
        [nomDuSalon, adresseSalon, dateOuverture, nombreEmployes, prenomGerant, nomGerant]
      );
    }
    console.log('Tous les utilisateurs ont été insérés avec succès.');
  } catch (error) {
    console.error('Erreur lors de l\'insertion des utilisateurs:', error);
  } finally {
    await connection.end();
  }
};

insertUsersIntoDB();
