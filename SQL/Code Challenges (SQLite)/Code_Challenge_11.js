const db = require('./db');

db.serialize(() => {
  db.run("DROP TABLE IF EXISTS Furniture;");
  db.run("CREATE TABLE Furniture");
});