'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}€</div>
      </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce(function (acc, mov) {
    return acc + mov;
  }, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

const createUsernames = function (accounts) {
  accounts.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  displayMovements(acc.movements);
  calcDisplayBalance(acc);
  calcDisplaySummary(acc);
};

let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    inputLoginUsername.blur();
    updateUI(currentAccount);
  }
});
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recieverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    recieverAcc &&
    currentAccount.balance >= amount &&
    recieverAcc.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    recieverAcc.movements.push(amount);

    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('delete');

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
//////////////////////////////Coding challenge #1
///////////////////////////////////////////////////////////////////////////
/*
const juliaData = [3, 5, 2, 12, 7];
const kateData = [9, 16, 6, 8, 3];

const juliaData2 = [9, 16, 6, 8, 3];
const kateData2 = [10, 5, 6, 1, 4];

const checkDogs = function (dogsJulia, dogsKate) {
  let juliaCopy = dogsJulia.slice(1, -2);
  const allData = juliaCopy.concat(dogsKate);

  allData.forEach(function (age, i) {
    if (age >= 3) {
      console.log(`Dog #${i + 1} is an adult and is ${age} years old.`);
    } else {
      console.log(`Dog #${i + 1} is a puppy and is ${age} years old.`);
    }
  });
};
checkDogs(juliaData, kateData);
console.log('----------------');
checkDogs(juliaData2, kateData2);
*/
//////////////////////////////Coding challenge #2
///////////////////////////////////////////////////////////////////////////
/*
const testData1 = [5, 2, 4, 1, 15, 8, 3];
const testData2 = [16, 6, 10, 5, 6, 1, 4];

const calcAverageHumanAge = function (ages) {
  const formulaCheck = ages.map(function (dogAge) {
    if (dogAge <= 2) return 2 * dogAge;
    else return dogAge * 4 + 16;
  });
  console.log(`-----FORMULA CHECK: ${formulaCheck}`);
  const noBabies = formulaCheck.filter(function (humanAges) {
    return humanAges > 18;
  });
  console.log(`-----NO BABIES ${noBabies}`);
  const sum = noBabies.reduce(function (acc, age) {
    return acc + age / noBabies.length;
  }, 0);
  console.log(sum);
};

calcAverageHumanAge(testData1);
calcAverageHumanAge(testData2);
*/
//////////////////////////////Coding challenge #3
///////////////////////////////////////////////////////////////////////////
/*
const testData1 = [5, 2, 4, 1, 15, 8, 3];
const testData2 = [16, 6, 10, 5, 6, 1, 4];
const calcAverageHumanAge = ages =>
  ages
    .map(dogAge => (dogAge <= 2 ? 2 * dogAge : dogAge * 4 + 16))
    .filter(humanAge => humanAge > 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
console.log(calcAverageHumanAge(testData1));
console.log(calcAverageHumanAge(testData2));
*/

//////////////////////////////Array challenges
///////////////////////////////////////////////////////////////////////////
/*
const transactions = accounts.flatMap(acc => acc.movements);

//calculate all transactions in the bank
const totalTrans = transactions.reduce((acc, mov) => acc + mov, 0);
console.log(totalTrans);

//find all deposits
const allDeposits = transactions.filter(mov => mov > 0).sort((a, b) => a - b);
console.log(allDeposits);

//how many deposts of at least 1000
const over1000 = transactions.filter(mov => mov >= 1000);
console.log(over1000.length);
//reduce method
const over1000reduce = transactions.reduce(
  (acc, cur) => (cur >= 1000 ? acc + 1 : acc),
  0
);
console.log(over1000reduce);

//create an object with the sum of deposits and sum of withdrawls
const withAndDepo = transactions.reduce(
  (acc, mov) => {
    mov > 0 ? (acc.deposits += mov) : (acc.withdrawals += mov);
    return acc;
  },
  {
    deposits: 0,
    withdrawals: 0,
  }
);
console.log(withAndDepo);

//create a function that converts a string to title case
const convertTitleCase = function (title) {
  const capitilize = str => str[0].toUpperCase() + str.slice(1);
  const exceptions = ['a', 'an', 'the', 'but', 'or', 'on', 'in'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitilize(word)))
    .join(' ');
  return capitilize(titleCase);
};
console.log(convertTitleCase('hi, my name is bob'));
console.log(convertTitleCase('the story of a happy penguin'));
*/

//////////////////////////////Coding challenge #3
///////////////////////////////////////////////////////////////////////////
/*
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

//ok amount  = within 10% recommended range

const addRecFoodObj = function (dogs) {
  dogs.forEach(function (dog) {
    dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28);
  });
};
addRecFoodObj(dogs);
console.log(dogs);

// const enoughFood = function (dog) {
//   if (dog.curFood < dog.recommendedFood * 0.9) {
//     console.log('Not enough food.');
//   } else if (dog.curFood > dog.recommendedFood * 1.1) {
//     console.log('Too much food!');
//   } else console.log('Good amount of food.');
// };
const enoughFood = function (dog) {
  if (dog.curFood < dog.recommendedFood * 0.9) {
    return 'Not enough food.';
  } else if (dog.curFood > dog.recommendedFood * 1.1) {
    return 'Too much food!';
  } else return 'Enough food.';
};

const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(enoughFood(dogSarah));

const tooLittleFood = dogs
  .filter(dog => dog.curFood < dog.recommendedFood * 0.9)
  .map(dog => dog.owners)
  .flat();
console.log(tooLittleFood);

const tooMuchFood = dogs
  .filter(dog => dog.curFood > dog.recommendedFood * 1.1)
  .map(dog => dog.owners)
  .flat();
console.log(tooMuchFood);

console.log(`${tooLittleFood.join(' and ')}'s dog(s) eat too little!`);
console.log(`${tooMuchFood.join(' and ')}'s dog(s) eat too much!`);

const perfectAmount = dogs.some(dog => dog.curFood === dog.recommendedFood);
console.log(perfectAmount);

const checkOkamount = dog =>
  dog.recommendedFood * 0.9 < dog.curFood &&
  dog.curFood < dog.recommendedFood * 1.1;

console.log(dogs.some(checkOkamount));

console.log(dogs.filter(checkOkamount));

const dogsCopy = dogs
  .slice()
  .sort((a, b) => a.recommendedFood - b.recommendedFood);
console.log(dogsCopy);
*/
