const express = require('express');
const path = require('path');
const fs = require('fs');
const filehelp = require('./public/middleware/filehelp');
const { v4: uuidv4 } = require('uuid');
const app = express();

//MiddleWares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/db/db.json'))
);

app.delete('/api/notes/:id', (req, res) => {  
  const removeID = req.params.id;  
  const database = JSON.parse(fs.readFileSync(__dirname + '/db/db.json', 'utf-8'));  
  const newDb = database.filter(element => {
      return element.id !== removeID
  });
  fs.writeFileSync(__dirname + '/db/db.json', JSON.stringify(newDb));
  res = console.info("Data Removed");
});

//Recieves post request then adds to database
app.post('/notes', (req, res) => {
   const {title, text} = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    filehelp(newNote, (path.join(__dirname, '/db/db.json')));
    res.json(`Note added successfully 🚀`);
  } else {
    res.error('Error in adding note');
  }
});

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);


app.listen( process.env.PORT || 3001, () =>
console.log('App listening at http://localhost:3001 🚀'));