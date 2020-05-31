var input = "turpentine and turtles";
var vowels = ['a', 'e', 'i', 'o', 'u'];
var resultArray = [];
let temp = input.length;

for(let i=0; i<temp; i++)
  {
    for(let j=0; j<vowels.length; j++)
      {
        if(vowels[j]==input[i])
          {
            resultArray.push(vowels[j]);
          }
      }
  }

for(let i=0; i<temp; i++)
  {
    if(resultArray[i]=='e') {
      resultArray.splice(i, 0, 'e');
      i++;
      }
    else if(resultArray[i]=='u') {
      resultArray.splice(i, 0, 'u');
      i++;
      }
  }

console.log(resultArray.join(" ").toUpperCase());

