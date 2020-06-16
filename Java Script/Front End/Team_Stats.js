const team = {
    _players: [
	{
		firstName: 'Pablo',
		lastName: 'Sanchez',
		age: 11
	},
	{
		firstName: 'Pete', 
      	lastName: 'Wheeler', 
      	age: 54
	},
	{
		firstName: 'Chris', 
      	lastName: 'Brown', 
      	age: 31
	}
	],

	_games: [
	{
		opponent: 'Broncos',
  		teamPoints: 42,
  		opponentPoints: 27
	},
	{
		opponent: 'Edison',
  		teamPoints: 35,
  		opponentPoints: 32
	},
	{
		opponent: 'Luis',
  		teamPoints: 11,
  		opponentPoints: 41
	}
	],

	get players() {
		return this._players;
	},	

	get games() {
		return this._games;
	},

	addPLayer: function (firstName, lastName, age) {
		let player = {
	      firstName: firstName,
	      lastName: lastName,
	      age: age
    	};
    	this.players.push(player);
	},

	addGame: function (opp, myPts, oppPts) {
	    const game = {
	      opponent: opp,
	      teamPoints: myPts,
	      opponentPoints: oppPts
	    };
	    this.games.push(game);
	}
};

team.addGame('Titans', 100, 98);


