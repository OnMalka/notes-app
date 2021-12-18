const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
    const notes = loadNotes();

    const duplicateNote = notes.find((note) => note.title === title);

    if(!duplicateNote){
        notes.push({
            title,
            body
        });
        console.log(chalk.green.inverse('New note added!'));
        saveNotes(notes);
    }else{
        console.log(chalk.bgRed.yellow('Note title taken!'));
    };  
};

const removeNote = (title) => {
    const notes = loadNotes();

    notesToKeep = notes.filter((note) => note.title !== title);

    if(notes.length > notesToKeep.length){
        console.log(chalk.green.inverse('Note deleted!'));
        saveNotes(notesToKeep);
    }else{
        console.log(chalk.bgRed.yellow('Note not found!'));
    };
};

const listNotes = () => {
    const notes = loadNotes();

    if(notes.length === 0)    
        console.log(chalk.bgRed.yellow('No notes!'));
    else
        console.log(chalk.green.inverse('Your notes:'));
        for(let i=1; i<=notes.length; i++){
            
            console.log(chalk.bgWhite.blue(i + ' title: ' + notes[i-1].title + ' body: ' + notes[i-1].body));           

        }
};

const readNote = (title) => {
    const notes = loadNotes();

    note = notes.find((note) => note.title === title);

    if(note){
        console.log(chalk.green.inverse('title: ' + note.title));
        console.log('Body: ' + note.body)
    }else{
        console.log(chalk.bgRed.yellow('Note not found!'));
    };
};

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
};

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }catch(err){
        return []
    };
};

module.exports = {
    addNote,
    removeNote,
    listNotes,
    readNote
};