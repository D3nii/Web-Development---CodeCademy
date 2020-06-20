const db = require('./db');

db.serialize( () => {
db.run('CREATE TABLE Popcorn (id INTEGER PRIMARY KEY, type TEXT)');
db.run('INSERT INTO POPCORN (type) VALUES ("cheddar")');
db.run('INSERT INTO POPCORN (type) VALUES ("kettle corn")');
});