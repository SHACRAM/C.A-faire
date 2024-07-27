import { faker } from '@faker-js/faker';

const Users = [];
let numberOfUsers = 15;

for (let i = 0; i < numberOfUsers; i++) {
    let nomDeCompte = faker.company.name();
    const user = {
        nomEntreprise: nomDeCompte,
        password: faker.internet.password(15),
        email : faker.internet.email({firstName : nomDeCompte}) 
    };

    Users.push(user);
}

console.log(Users);
