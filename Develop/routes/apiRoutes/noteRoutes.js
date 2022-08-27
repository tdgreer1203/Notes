const router = require('express').Router();
const { filterByQuery, createNewNote, deleteNote, validateNote } = require('../../lib/notes');
const { notes } = require('../../db/notes.json');

router.get('/notes', (req, res) => {
    let results = notes;
    if(req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

router.get('/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if(result) {
        res.json(result);
    } else {
        res.send(404);
    }
})

router.post('/notes', (req, res) => {
    req.body.id = notes.length.toString();
    if(!validateNote(req.body)) {
        res.status(400).send('The not is not properly formatted.');
    } else {
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
});

router.delete('/notes/:id', (req, res) => {
    res.json(deleteNote(req.params.id, notes))
});

module.exports = router;