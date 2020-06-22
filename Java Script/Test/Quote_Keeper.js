const {assert} = require('chai');

describe('User visits root', () => {
	describe('posting a quote', () => {
		it('saves quote and metadata submitted by user', () => {
			const quote = `Nowadays you don't go around on the street kicking people, punching people — because if you do (makes gun shape with hand), well that's it — I don't care how good you are.`;

			const attributed = 'Bruce Lee';

			const source = 'WikiQuote';

			browser.url('/');
			browser.setValue(textarea[id=quote], quote);
			browser.setValue(textarea[id=attributed], attributed);
			browser.setValue(textarea[id=source], source);
			browser.click(input[type=submit]);

			assert.include(browser.getText('#quote').quote);
			assert.include(browser.getText('#attributed').attributed);
			assert.include(browser.getText('#source').source);
		});
	});
});

// In the 'index.html' file
<div id="quotes" name="quotes">
	<textarea id="quote" name="quote"></textarea>
	<input id="attributed" name="attributed">
	<input id="source" name="source">
	<input type="submit">
</div>