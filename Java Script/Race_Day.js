let raceNumber = Math.floor(Math.random() * 1000);

let registeredEarly = false;
let age = 18;

if(age>18 && registeredEarly) {
    raceNumber += 1000;
  }

if(age>18 && registeredEarly) {
   console.log(`${raceNumber}, you will race at 9:30 am.`);
   }
else if(age>18 && !registeredEarly) {
  console.log(`${raceNumber}, you will race at 11:30 am.`);
}
else if(age<18) {
  console.log(`${raceNumber}, you will race at 12:30 am.`);
}
else
   console.log(`${raceNumber}, please see the registration desk.`);