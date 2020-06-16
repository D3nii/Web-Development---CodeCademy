class School {
	constructor(name, level, numberOfStudents) {
		this._name = name;
		this._level = level;
		this._numberOfStudents = numberOfStudents;
	}

	get name() {
		return this._name;
	}

	get level() {
		return this._level;
	}

	get numberOfStudents() {
		return this._numberOfStudents;
	}

	set numberOfStudents(x) {
		if(typeof x == 'number') {
			this._numberOfStudents = x;
		} else {
			console.log('Invalid input: numberOfStudents must be set to a Number.');
		}
	}

	quickFacts() {
		console.log(`${this._name} educates ${this._numberOfStudents} students at the ${this._level} school level.`);
	}

	static pickSubstituteTeacher(substituteTeachers) {
		let temp = 0;
		temp = Math.floor(Math.random() * (substituteTeachers.length - 1));
		return substituteTeachers[temp];
	}
};

class PrimarySchool extends School {
	constructor(name, numberOfStudents, pickupPolicy) {
		super(name, 'primary', numberOfStudents);
		this._pickupPolicy = pickupPolicy;
	}

	get pickupPolicy() {
		return this._pickupPolicy;
	}
};

class HighSchool extends School {
	constructor(sportsTeams) {
		this._sportsTeams = sportsTeams;
	}

	get sportsTeams() {
		console.log(this._sportsTeams);
		return this._sportsTeams;
	}
};

const lorraineHansbury = new PrimarySchool('Lorraine Hansbury', 514, 'Students must be picked up by a parent, guardian, or a family member over the age of 13.');

lorraineHansbury.quickFacts();
lorraineHansbury.pickSubstituteTeacher(['Jamal Crawford', 'Lou Williams', 'J. R. Smith', 'James Harden', 'Jason Terry', 'Manu Ginobli']);

const alSmith = new HighSchool('Al E. Smith', 415, ['Baseball', 'Basketball', 'Volleyball', 'Track and Field']);

alSmith.sportsTeams();