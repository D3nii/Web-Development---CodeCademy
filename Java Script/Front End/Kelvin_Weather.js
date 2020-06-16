const kelvin = 293; //The value wont change
let celsius = kelvin - 273; // This is the celsius of the kelvin measure
let fahrenheit = celsius * (9/5) +32; // This is the formula
fahrenheit = Math.floor(fahrenheit); // To eliminate any decimals in it
console.log(`The temperature is ${fahrenheit} degrees Fahrenheit.`);
