function getSleepHours(day) {
  if(day=='monday')
    return 8
  else if(day=='tuesday')
    return 7
  else if(day=='wednesday')
    return 5.5
  else if(day=='thursday')
    return 9
  else if(day=='friday')
    return 7
  else if(day=='saturday')
    return 8
}

function getActualSleepHours() {
  let x = 0;
  x += getSleepHours('monday');
  x += getSleepHours('tuesday');
  x += getSleepHours('wednesday');
  x += getSleepHours('thursday');
  x += getSleepHours('friday');
  x += getSleepHours('saturday');
  
  return x;
}

function getIdealSleepHours() {
  let idealHours = 9;
  return idealHours * 7;
}

function calculateSleepDebt() {
  let actualSleepHours = getActualSleepHours();
  let idealSleepHours = getIdealSleepHours();
  
  if(actualSleepHours==idealSleepHours)
    console.log('Perfect amount of sleep is what you got!');
  else if(actualSleepHours>idealSleepHours)
    console.log('More amount of sleep is what you got than how much you need!');
  else if(actualSleepHours<idealSleepHours)
    console.log('More amount of sleep is what you need!');
}

calculateSleepDebt();











