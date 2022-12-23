const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const email: string = 'wbouricha5@gmail.com';
const result: boolean = expression.test(email); // true

console.log('l\'e-mail est ' + (result ? 'correct' : 'incorrect'));

const regexName = new RegExp(/^[a-zA-Z0-9 ]*$/) ;
const nameR: string = "wassim";
const resultName: boolean = regexName.test(nameR);

console.log('Le nom est ' + (resultName ? 'correct' : 'incorrect'));

const regexPower: RegExp = /^[a-zA-Z- ]*$/;
const power: string = "spider-sense";
const resultPower: boolean = regexPower.test(power);

console.log('Le pouvoir est ' + (resultPower ? 'correct' : 'incorrect'));
