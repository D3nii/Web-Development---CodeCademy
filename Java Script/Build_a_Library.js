class Media {
	constructor(title) {
		this._title = title;
		this._ratings = [];
		this._isCheckedOut = false;
	}

	get title() {
		return this._title;
	}

	get isCheckedOut() {
		return this._isCheckedOut;
	}

	get ratings() {
		return this._ratings;
	}

	set isCheckedOut(x) {
		this._isCheckedOut = x;
	}

	toggleCheckOutStatus() {
		this._isCheckedOut = !this._isCheckedOut;
	}

	getAverageRating() {
	    let temp = this._ratings.length;
	    let t=0;
	    
	    for(let i=0; i<temp; i++) {
	      t += this._ratings[i];
	    }
	    
	    return t/temp;
	}
	  
	addRating(x) {
		this._ratings.push(x);
	}
};

class Book extends Media {
	constructor(author, title, pages) {
		super(title);
    	this._author = author;
		this._pages = pages;
	}

	get author() {
		return this._author;
	}

	get pages() {
		return this._pages;
	}
};

class Movie extends Media{
	constructor(director, title, runTime) {
		super(title);
		this._director = director;
		this._runTime = runTime;
	}

	get director() {
		return this._director;
	}

	get runTime() {
		return this._runTime;
	}
}

const historyOfEverything = new Book('Bill Bryson', 'A Short History of Nearly Everything', 544);

historyOfEverything.toggleCheckOutStatus();
console.log(historyOfEverything.isCheckedOut)

historyOfEverything.addRating(4);
historyOfEverything.addRating(5);
historyOfEverything.addRating(5);

console.log(historyOfEverything.getAverageRating());


const speed = new Movie('Jan de Bont', 'Speed', 116);

speed.toggleCheckOutStatus();
console.log(speed.isCheckedOut)

speed.addRating(1);
speed.addRating(1);
speed.addRating(5);

console.log(speed.getAverageRating());
