const assert = require('assert');
const Rooster = require('../index');

describe('string', () => {
	describe('.announceDown', () => {
		it('returns a rooster call', () => {
			const expected = 'moo!';

			const actual = Rooster.announceDown();

			assert.equal(expected, actual);
		});
	});
  	
  	describe('.timeAtDawn', () => {
		it('returns its argument as a string', () => {
			const input = 12;
			const expected = '12';

			const actual = Rooster.timeAtDawn(input);

			assert.equal(expected, actual);
		});

		it('throws an error if passed a number less than 0', () => {
			const input = -1;
			const expected = RangeError;

			assert.throws(() => {
				Rooster.timeAtDawn(input);
			}, expected);
		});

		it('throws an error if passed a number greater than 23', () => {
			const input = 24;
			const expected = RangeError;

			assert.throws(() => {
				Rooster.timeAtDawn(input);
			}, expected);
		});
	});
});