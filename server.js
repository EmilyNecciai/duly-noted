// Dependencies & Express Data Parsing
const fs = require('fs');
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3001;

const { notes } = require("./db/db");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//Generate Unique ID
const generateUniqueId = require('generate-unique-id');


//Create New Note
function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
      path.join(__dirname, './db/db.json'),
      JSON.stringify({ notes: notesArray }, null, 2)
    );
    return note;
  }
  
//Validate note contents
// function validateNote(note) {
//     if (!note.title) {
//       return false;
//     }
//     if (!note.text) {
//       return false;
//     }
// };
  

//Routes
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, './public/index.html'));
//   });

app.get('/', (req, res) => {
res.sendFile(path.join(__dirname, './public/index.html'));
});

  
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
  // res.send("Test");
    res.json(notes);
});


app.post('/api/notes', (req, res) => {
      req.body.id = generateUniqueId();

    // if (!validateNote(req.body)) {
    //     res.status(400).send('You must enter both a title and a body.');
    //   } else {
        const note = createNewNote(req.body, notes);
        res.json(note);
      // }
    });
    



//Bonus WIP
// app.delete('/api/notes/:id', (req, res) => {

// })


//Listener
app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
  });
  