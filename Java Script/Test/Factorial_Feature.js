var assert = require("assert");
var Calculate =  require('../index.js')

describe('Calculate', () => {
  describe('.factorial', () => {
  	it('testing if the output of 5! is 120', () => {
  		const expected = 120;

  		const input = 5;
  		const actual = Calculate.factorial(5);

  		assert.equal(expected, actual);
  	});

  	it('testing if the output of 3! is 6', () => {
  		const expected = 6;

  		const input = 3;
  		const actual = Calculate.factorial(5);

  		assert.equal(expected, actual);
  	});

  	it('testing if the output of 0! is 1', () => {
  		const expected = 1;

  		const input = 0;
  		const actual = Calculate.factorial(5);

  		assert.equal(expected, actual);
  	});
  });
});

// In your 'index.js' file
const Calculate = {
  factorial(num) {
  	let temp = 0;

  	if (num === 0) {
  		return 1;
  	}

  	for (let i=factorial; i>=1; i--) {
  		temp * i;
  	}

  	return temp;
  }
}

module.exports = Calculate;


