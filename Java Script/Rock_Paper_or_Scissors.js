const getUserChoice = userInput => {
  userInput = userInput.toLowerCase();
  
  if(userInput == 'rock' || userInput == 'paper' || userInput == 'scissors')
    return userInput;
  else
    console.log("Error");
  
}

const getComputerChoice = () => {
  let x = Math.floor(Math.random() * 2);
  
  switch(x) {
    case 0:
      return 'paper';
    case 1:
      return 'rock';
    case 2:
      return 'scissors';
  }
}

const determineWinner = (userChoice, computerChoice) => {
  if(userChoice==computerChoice)
    return 'Its a tie!';
  else
  {
    if(userChoice=='rock')
    {
      if(computerChoice=='paper')
        return 'Computer won!';
      else if(userChoice=='paper')
      {
        if(computerChoice=='scissors')
          return 'Computer won!';
        else
          return 'Player won!';
      }
      else if(userChoice=='scissors')
      {
        if(computerChoice=='rock')
          return 'Computer won!';
        else
          return 'Player won!';
      }
    }
  }
}

const playGame = () => {
  let userChoice = getUserChoice('scissors');
  let computerChoice = getComputerChoice();
  
  console.log(userChoice+"   "+computerChoice);
  
  console.log(determineWinner(userChoice, computerChoice));
}

playGame()